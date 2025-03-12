"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const SessionRedirect = async ({
  condition,
  to,
}: {
  condition: "authenticated" | "unauthenticated";
  to: string;
}) => {
  const session = await auth();
  if (
    (condition === "authenticated" && session) ||
    (condition === "unauthenticated" && !session)
  ) {
    redirect(to);
  }
  return null;
};
