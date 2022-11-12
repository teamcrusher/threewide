import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { strategyRouter } from "./strategy";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  strategy: strategyRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;