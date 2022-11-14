import mongoose, { ObjectId } from "mongoose";

interface UserDocument extends mongoose.Document<ObjectId>, User {}

export interface User {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserModel: mongoose.Model<UserDocument> =
  mongoose.models.user || mongoose.model<UserDocument>("user", userSchema);

export default UserModel;
