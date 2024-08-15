"use server";

import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { actionClient, ActionError } from "./safe-action";

export const logOut = actionClient.action(async () => {
  const { session } = await validateRequest();
  if (!session) {
    throw new ActionError("You are unauthorized");
  }
  await lucia.invalidateSession(session.id);

  const blankSessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    blankSessionCookie.name,
    blankSessionCookie.value,
    blankSessionCookie.attributes,
  );
  return redirect("/login");
});
