import GameDescriptionModel from "src/models/game_description.model";
import { z } from "zod";
import StrategyModel from "../../../models/stategy.model";
import connectMongo from "../../../utils/mongoose";
import { Types } from "mongoose";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const gameDescriptionRouter = router({
  getGames: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      try {
        await connectMongo();

        const strategy = await StrategyModel.findOne({
          name: {
            $eq: input.name,
          },
        });

        console.log(strategy?.games.map((id) => new Types.ObjectId(id)));

        const games = await GameDescriptionModel.find({
          strategy: {
            $eq: strategy?._id,
          },
        });

        return { games };
      } catch (err) {
        console.log(err);
        return { error: err };
      }
    }),
});
