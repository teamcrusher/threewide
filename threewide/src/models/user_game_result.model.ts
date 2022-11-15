import mongoose, { ObjectId, Types } from "mongoose";
import { PieceType } from "src/types/tetris";

export interface UserGameResult {
    isCompleted: boolean;
}

export interface UserGameResultDocument extends mongoose.Document<ObjectId>, UserGameResult {
    strategy: ObjectId;
    userId: ObjectId;
    gameId: ObjectId;
}

const userGameResultSchema = new mongoose.Schema({
    strategy: Types.ObjectId,
    userId: Types.ObjectId,
    gameId: Types.ObjectId,
    isCompleted: Boolean    
})

const UserGameResultModel : mongoose.Model<UserGameResultDocument> = mongoose.models.UserGameResult || mongoose.model<UserGameResultDocument>("UserGameResult", userGameResultSchema);

export default UserGameResultModel;
