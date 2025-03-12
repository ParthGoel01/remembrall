import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { router } from "@/server/__internals/router";
import { publicProcedure } from "@/server/procedures";

type StatusOutputType = {
  status: "unauthorized" | "not_found" | "ok";
};

export const authRouter = router({
  getUserStatus: publicProcedure.query(async ({ c }) => {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return c.json({ status: "unauthorized" } as StatusOutputType);
    }
    try {
      const user = await db.user.findFirst({
        where: {
          email: session.user.email,
        },
      });
      if (!user) {
        return c.json({ status: "not_found" } as StatusOutputType);
      }
    } catch (err) {
      return c.json({ status: "not_found", err } as StatusOutputType);
    }
    return c.json({ status: "ok" } as StatusOutputType);
  }),
});
