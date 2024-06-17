import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) return;
  const uri = `${process.env.MONGO_URL}/${process.env.MONGO_DATABASE_NAME}`;
  try {
    await mongoose.connect(uri);
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose", error);
  }
};

export default dbConnect;
