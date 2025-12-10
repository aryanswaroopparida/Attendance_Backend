import mongoose from "mongoose";
import config from "../config/config.js";

async function connect() {
  try {
    await mongoose.connect(config.MONGODB.URL, config.MONGODB.options);
    console.log("Connected to MONGODB");
  } catch (error) {
    console.error("Error while connecting to MONGODB ", error);
  }
}

export default connect;
