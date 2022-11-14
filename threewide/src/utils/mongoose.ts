import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connections[0]?.readyState ?? false) return;

  mongoose.connect("mongodb://127.0.0.1:27017/test");
};

export default connectMongo;
