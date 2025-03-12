import { HTTPException } from "hono/http-exception";
import { j } from "./__internals/j";
import { auth } from "@/lib/auth";

const authMiddleware = j.middleware(async ({ next }) => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  return next({ user: session.user });
});

export const baseProcedure = j.procedure;
export const publicProcedure = baseProcedure;
export const privateProcedure = publicProcedure.use(authMiddleware);
