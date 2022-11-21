import mongoose, { ObjectId } from "mongoose";

interface UserDocument extends mongoose.Document<ObjectId>, ThreeWideUser {}

export interface ThreeWideUser {
  username: string;
  password: string;
  userId: string;
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserModel: mongoose.Model<UserDocument> =
  mongoose.models.user || mongoose.model<UserDocument>("user", userSchema);

export default UserModel;
