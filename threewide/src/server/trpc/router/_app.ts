import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { gameDescriptionRouter } from "./gameDescription";
import { strategyRouter } from "./strategy";
import { userGameResultRouter } from "./userGameResult";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  strategy: strategyRouter,
  gameDescription: gameDescriptionRouter,
  userGameResult: userGameResultRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
