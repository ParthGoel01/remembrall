import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";

export const dummyRouter = router({
  dummy: publicProcedure.query(async ({ c }) => {
    return c.json({ message: "Hello, World!" });
  }),
});
