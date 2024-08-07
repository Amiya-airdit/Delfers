import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log("db connected");
  } catch (err) {
    console.log("Failed to connect database : ", err.message);
  }
};

export default connectToMongoDB;
