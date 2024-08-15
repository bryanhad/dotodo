"use server";

import { lucia } from "@/auth";
import { verify } from "@node-rs/argon2";
import { flattenValidationErrors } from "next-safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { actionClient, ActionError } from "@/lib/safe-action";
import { signInFormSchema } from "@/lib/validation";
import { argonHashOptionConfig } from "@/lib/utils";

export const signIn = actionClient
  .schema(signInFormSchema, {
    handleValidationErrorsShape: (validationErrors) =>
      flattenValidationErrors(validationErrors).fieldErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (!existingUser) {
      throw new ActionError("No user with this email");
    }
    if (!existingUser.passwordHash) {
      throw new ActionError("This user uses google login!");
    }
    const validPassword = await verify(
      existingUser.passwordHash,
      password,
      argonHashOptionConfig,
    );
    if (!validPassword) {
      throw new ActionError("Incorrect email or password");
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
