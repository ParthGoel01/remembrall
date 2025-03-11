import { HTTPException } from "hono/http-exception";
import { j } from "./__internals/j";

const authMiddleware = j.middleware(async ({ next }) => {
  // TODO: Add authentication
  const user = {};
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  return next({ user });
});

export const baseProcedure = j.procedure;
export const publicProcedure = baseProcedure;
export const privateProcedure = publicProcedure.use(authMiddleware);
