import mongoose, { ObjectId, Types } from "mongoose";
import { PieceType } from "src/types/tetris";

export interface Goal {
  linesCleared?: number | undefined;
  pointsGained?: number | undefined;
  tspinSingles?: number | undefined;
  tspinTriples?: number | undefined;
  tspinDoubles?: number | undefined;
  tspinMinis?: number | undefined;
  tspinMiniDoubles?: number | undefined;
  finalState?: PieceType[][] | undefined;
  allowAllClears?: boolean | undefined;
}

export interface GameDescription extends mongoose.Document<ObjectId> {
  startingBoardState: PieceType[][];
  startingPieceQueue: PieceType[];
  goal: Goal;
  strategy: Types.ObjectId;
}

//small hack for now will fix later
export interface GameType {
  startingBoardState: PieceType[][];
  startingPieceQueue: PieceType[];
  goal: Goal;
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
