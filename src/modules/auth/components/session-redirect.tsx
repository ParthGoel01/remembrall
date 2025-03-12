"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const SessionRedirect = async ({
  condition,
  to,
}: {
  condition: "authenticated" | "unauthenticated" | "unsynced" | "synced";
  to: string;
}) => {
  const session = await auth();
  if (
    (condition === "authenticated" && session) ||
    (condition === "unauthenticated" && !session)
  ) {
    redirect(to);
  }
  if (condition === "unsynced" || condition === "synced") {
    const user = await db.user.findFirst({
      where: {
        email: session?.user?.email ?? "",
      },
    });
    if (
      (condition === "unsynced" && !user) ||
      (condition === "synced" && user)
    ) {
      redirect(to);
    }
  }
  return null;
};
