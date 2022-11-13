import mongoose, { ObjectId, Types } from "mongoose";
import { PieceType } from "src/types/tetris";

export interface GameDescription extends mongoose.Document<ObjectId> {
  startingBoardState: PieceType[][];
  startingPieceQueue: PieceType[];
  goal: {
    linesCleared: number | undefined;
    pointsGained: number | undefined;
    tspinSingles: number | undefined;
    tspinTriples: number | undefined;
    tspinDoubles: number | undefined;
    finalState: string[][] | undefined;
  };
  strategy: Types.ObjectId;
}

const goalSchema = new mongoose.Schema({
  linesCleared: Number,
  pointsGained: Number,
  tspinSingles: Number,
  tspinTriples: Number,
  tspinDoubles: Number,
  tspinMini: Number,
  tspinMiniDouble: Number,
  finalState: [[String]],
});

const gameDescriptionSchema = new mongoose.Schema({
  startingBoardState: [[String]],
  startingPieceQueue: [String],
  goal: { type: goalSchema },
  types: Types.ObjectId,
});

const GameDescriptionModel: mongoose.Model<GameDescription> =
  mongoose.models.GameDescription ||
  mongoose.model<GameDescription>("GameDescription", gameDescriptionSchema);

export default GameDescriptionModel;
