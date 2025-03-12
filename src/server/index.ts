import { authRouter } from "@/modules/auth/server/auth-router";
import { userRouter } from "@/modules/user/server/user-router";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api").use(cors());

const appRouter = app
  .route("/applicationAuth", authRouter)
  .route("/user", userRouter);

export const httpHandler = handle(app);
export default app;
export type AppType = typeof appRouter;
