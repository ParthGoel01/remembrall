import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { dummyRouter } from "./routers/dummy-router";

const app = new Hono().basePath("/api").use(cors());

const appRouter = app.route("/dummy", dummyRouter);

export const httpHandler = handle(app);
export default app;
export type AppType = typeof appRouter;
