import mongoose from "mongoose";

const connectDB = async (res) => {
  try {
    if (mongoose.connections[0].readyState) return;

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to DB");
  } catch (error) {
    console.log("Connection to DB failed");

    if (res)
      res.status(500).json({
        code: 500,
        status: "failure",
        message: "Failed to connect to database",
      });
      return;
  }
};

export default connectDB;
