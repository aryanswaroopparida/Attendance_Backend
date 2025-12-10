import express from "express";
import config from "./config/config.js";
import connect from "./db/connect.js";
import router from "./routes/routes.js";

connect();

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is working fine" });
});

app.use("/v1", router);

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});
