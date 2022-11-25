import { Settings } from "@components/Settings";
import mongoose, { ObjectId } from "mongoose";

interface UserDocument extends mongoose.Document<ObjectId>, ThreeWideUser {}

export interface ThreeWideUser {
  username: string;
  password: string;
  userId: string;
  settings: Settings;
}

const userSettingsSchema = new mongoose.Schema({
  keySettings: {
    moveLeft: String,
    moveRight: String,
    holdPiece: String,
    softDrop: String,
    hardDrop: String,
    rotate90: String,
    rotate180: String,
    rotate270: String,
  },
  dasAmount: Number,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  settings: { type: userSettingsSchema },
});

const UserModel: mongoose.Model<UserDocument> =
  mongoose.models.user || mongoose.model<UserDocument>("user", userSchema);

export default UserModel;
