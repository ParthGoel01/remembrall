import { db } from "@/lib/db";
import { router } from "@/server/__internals/router";
import { privateProcedure, syncProcedure } from "@/server/procedures";
import { HTTPException } from "hono/http-exception";
import { newUserFormSchema } from "../types";

export const userRouter = router({
  createUser: privateProcedure
    .input(newUserFormSchema)
    .mutation(async ({ c, ctx, input }) => {
      if (!ctx.user.email) {
        throw new HTTPException(401, { message: "Unauthorized" });
      }
      const user = await db.user.create({
        data: {
          displayName: input.displayName,
          email: ctx.user.email,
          username: input.username,
          profilePicture: input.profilePicture ?? ctx.user.image,
        },
      });
      return c.json(user);
    }),
  getUser: syncProcedure.query(async ({ ctx, c }) => {
    return c.json({ user: ctx.user });
  }),
});
