import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connections[0]?.readyState ?? false) return;

  mongoose.connect(process.env.MONGODB_URI!);
};

export default connectMongo;
