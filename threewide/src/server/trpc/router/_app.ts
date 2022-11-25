import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { gameDescriptionRouter } from "./gameDescription";
import { strategyRouter } from "./strategy";
import { userRouter } from "./user";
import { userGameResultRouter } from "./userGameResult";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  strategy: strategyRouter,
  gameDescription: gameDescriptionRouter,
  userGameResult: userGameResultRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
