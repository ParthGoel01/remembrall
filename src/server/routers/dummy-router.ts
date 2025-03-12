import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";

export const dummyRouter = router({
  dummy: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx;
    return c.json({ user, message: "Hello, World!" });
  }),
});
