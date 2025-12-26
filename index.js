import express from "express";
import config from "./config/config.js";
import connectToDB from "./db/connect.js";
import router from "./routes/routes.js";
import { attendanceAtNight } from "./cronJobs/cron.js";

connectToDB();

const app = express();

attendanceAtNight();

app.use(express.json())

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is working fine" });
});

app.use("/v1", router);

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});
