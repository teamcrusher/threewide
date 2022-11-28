import { isError } from "@tanstack/react-query";
import { Types } from "mongoose";
import UserModel from "src/models/user.model";
import { z } from "zod";
import connectMongo from "../../../utils/mongoose";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  getUserSettings: publicProcedure
    .input(
      z.object({
        userId: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      try {
        if (!input.userId) return;

        await connectMongo();

        let user = await UserModel.findOne({
          _id: { $eq: new Types.ObjectId(input.userId) },
        });

        if (!user) {
          return { error: "User not found" };
        }

        return {
          settings: user.settings,
        };
      } catch (err) {
        console.log(err);
        return { error: err };
      }
    }),
  saveUserSettings: publicProcedure
    .input(
      z.object({
        userId: z.string().nullish(),
        settings: z.object({
          keySettings: z.object({
            moveLeft: z.string(),
            moveRight: z.string(),
            holdPiece: z.string(),
            hardDrop: z.string(),
            softDrop: z.string(),
            rotate90: z.string(),
            rotate180: z.string(),
            rotate270: z.string(),
            reset: z.string(),
            next: z.string(),
            previous: z.string(),
          }),
          dasAmount: z.number(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      try {
        if (!input.userId) return;
        await connectMongo();

        await UserModel.updateOne(
          {
            _id: { $eq: new Types.ObjectId(input.userId) },
          },
          {
            $set: {
              settings: input.settings,
            },
          }
        );
      } catch (err) {
        console.log(err);
        return { error: err };
      }
    }),
});
