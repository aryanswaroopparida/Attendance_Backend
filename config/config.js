import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGODB: {
    //connection pooling
    URL: process.env.MONGODB_URL,
    options: {
      maxPoolSize: 495,
      minPoolSize: 50,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
    },
  },
  REDIS_URL: process.env.REDIS_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ATTENDANCE_REDIS_KEY: "attendance",
  THRESHOLD_COUNT: 6,
};

export default config;
