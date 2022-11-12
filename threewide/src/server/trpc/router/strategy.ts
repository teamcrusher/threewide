import { z } from "zod";
import StrategyModel from "../../../models/stategy.model";
import connectMongo from "../../../utils/mongoose";

import { router, publicProcedure } from "../trpc";

export const strategyRouter = router({
  search: publicProcedure
    .input(z.object({ name: z.string().nullish() }).nullish())
    .query(async ({ input }) => {
        try {
            await connectMongo();

            const results = await StrategyModel.find({
                name : {
                $regex : input?.name
            }})
            
            console.log(results)
            return {
                results
          };
        } catch (err) {
            console.log(err)
            return {error: err}
        }

    }),
});
