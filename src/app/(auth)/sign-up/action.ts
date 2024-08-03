"use server"

import { lucia } from "@/auth";
import db from "@/lib/db";
import { actionClient, CustomError } from "@/lib/safe-action";
import { argonHashOptionConfig } from "@/lib/utils";
import { signUpFormSchema } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { flattenValidationErrors } from "next-safe-action";
import { cookies } from "next/headers";


export const signUp = actionClient
  .schema(signUpFormSchema, {
    handleValidationErrorsShape: (validationErrors) =>
      flattenValidationErrors(validationErrors).fieldErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const existingUser = await db.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
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