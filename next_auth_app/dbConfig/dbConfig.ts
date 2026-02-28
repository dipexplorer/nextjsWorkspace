import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URL;

export default function connectDB() {
  try {
    mongoose.connect(MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    connection.on("error", (err) => {
      console.log("MongoDB Connection Error", err);
      process.exit();
    });
  } catch (err) {
    console.log(err);
  }
}
