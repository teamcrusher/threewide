import GameDescriptionModel, { Game } from "src/models/game_description.model";
import { z } from "zod";
import StrategyModel from "../../../models/stategy.model";
import connectMongo from "../../../utils/mongoose";
import { Types } from "mongoose";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import UserGameResultModel, { UserGameResult, UserGameResultDocument } from "src/models/user_game_result.model";

export interface UserGame extends Game, UserGameResult {
  isAttempted : boolean;
} 

export const gameDescriptionRouter = router({
  getGames: publicProcedure
    .input(z.object({ name: z.string(), userId : z.string() }))
    .query(async ({ input }) => {
      try {
        await connectMongo();

        const strategy = await StrategyModel.findOne({
          name: {
            $eq: input.name,
          },
        });

        const games = await GameDescriptionModel.find({
          strategy: {
            $eq: strategy?._id,
          },
        });

        let userGames : Promise<UserGame>[] = games.map(async game => {
          let userGameResult : UserGameResultDocument | null = await UserGameResultModel.findOne({
            userId : {
              $eq : new Types.ObjectId(input.userId)
            },
            gameId: {
              $eq: game._id
            }
          });
          
          return {
            ...game,
            isCompleted : userGameResult?.isCompleted ?? false,
            isAttempted : userGameResult !== null
          }
        })        

        return { games: await Promise.all(userGames) };
      } catch (err) {
        console.log(err);
        return { error: err };
      }
    }),
});
