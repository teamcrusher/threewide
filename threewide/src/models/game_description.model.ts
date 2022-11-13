import mongoose, { ObjectId } from "mongoose";

export interface GameDescription extends mongoose.Document<ObjectId> {
  startingBoardState: string[][];
  startingPieceQueue: string[];
  goal: {
    linesCleared: number | undefined;
    pointsGained: number | undefined;
    tspinSingles: number | undefined;
    tspinTriples: number | undefined;
    tspinDoubles: number | undefined;
    finalState: string[][] | undefined;
  };
}

const goalSchema = new mongoose.Schema({
  linesCleared: Number,
  pointsGained: Number,
  tspinSingles: Number,
  tspinTriples: Number,
  tspinDoubles: Number,
  finalState: [[String]],
});

const gameDescriptionSchema = new mongoose.Schema({
  startingBoardState: [[String]],
  startingPieceQueue: [String],
  goal: { type: goalSchema },
});

const GameDescriptionModel: mongoose.Model<GameDescription> =
  mongoose.models.GameDescription ||
  mongoose.model<GameDescription>("GameDescription", gameDescriptionSchema);

export default GameDescriptionModel;
