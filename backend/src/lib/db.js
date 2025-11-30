import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.DB_URL) {
      throw new Error("DB_URL environment variable is not defined");
    }
    const conn = await mongoose.connect(ENV.DB_URL);

    console.log("Connected to the MongoDB:", conn.connection.host);
  } catch (err) {
    console.error("❌ Connection Error");

    process.exit(1); // 0 means success and 1 means exit
  }
};
