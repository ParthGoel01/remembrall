import { HTTPException } from "hono/http-exception";
import { j } from "./__internals/j";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const authMiddleware = j.middleware(async ({ next }) => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  return next({ user: session.user });
});

const syncMiddleware = j.middleware(async ({ next }) => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    throw new HTTPException(400, { message: "User not present in database" });
  }
  return next({ user });
});

export const baseProcedure = j.procedure;
export const publicProcedure = baseProcedure;
export const privateProcedure = publicProcedure.use(authMiddleware);
export const syncProcedure = publicProcedure.use(syncMiddleware);
