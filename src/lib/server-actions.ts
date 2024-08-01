"use server";

import { flattenValidationErrors } from "next-safe-action";
import { actionClient, CustomError } from "./safe-action";
import { hash, verify, Options } from "@node-rs/argon2";
import { signInFormSchema, signUpFormSchema } from "./validation";
import { generateIdFromEntropySize } from "lucia";
import db from "./db";
import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const argonHashOptionConfig: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const signUp = actionClient
  .schema(signUpFormSchema, {
    handleValidationErrorsShape: (validationErrors) =>
      flattenValidationErrors(validationErrors).fieldErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new CustomError("Email has been taken");
    }

    const passwordHash = await hash(password, argonHashOptionConfig);
    const newUserId = generateIdFromEntropySize(10); // 16 characters long

    const newUser = await db.user.create({
      data: {
        id: newUserId,
        email,
        passwordHash,
      },
    });

    // creating user us successful!
    // now we create the session cookie to be sent to the user!
    const session = await lucia.createSession(newUserId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { username: newUser.email };
  });

export const signIn = actionClient
  .schema(signInFormSchema, {
    handleValidationErrorsShape: (validationErrors) =>
      flattenValidationErrors(validationErrors).fieldErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (!existingUser) {
      throw new CustomError("No user with this email");
    }
    if (!existingUser.passwordHash) {
      throw new CustomError("This user uses google login!");
    }
    const validPassword = await verify(
      existingUser.passwordHash,
      password,
      argonHashOptionConfig,
    );
    if (!validPassword) {
      throw new CustomError("Incorrect email or password");
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  return redirect("/");
  });

export const logOut = actionClient.action(async () => {
  const { session } = await validateRequest();
  if (!session) {
    throw new CustomError("You are unauthorized");
  }
  await lucia.invalidateSession(session.id);

  const blankSessionCookie = await lucia.createBlankSessionCookie()
  cookies().set(blankSessionCookie.name, blankSessionCookie.value, blankSessionCookie.attributes)
  return redirect("/login");
});
