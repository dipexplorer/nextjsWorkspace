import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
    });

    connection.on("error", (err) => {
      console.log(
        "Mongoose connection error. Please make sure MONGODB is running. ",
        err
      );
      process.exit();
    });
  } catch (err) {
    console.log("Mongoose Connection Error: ", err);
  }
};
