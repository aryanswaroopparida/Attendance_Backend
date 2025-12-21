import axios from "axios";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import cacheMethods from "../redis/methods.js";
import timeIST from "../utils/time.js";

export const signIn = async (req, res) => {
  const body = req.body;
  console.log(body);
  const response = await axios.post("https://dextraa.vercel.app/api/login", {
    email: body.email,
    password: body.password,
  });
  console.log(response.data);
  response.data.user.latitude = 13;
  response.data.user.longitude = 80;

  const signed = jwt.sign(
    {
      data: response.data,
    },
    config.JWT_SECRET,
    { expiresIn: 30 * 24 * 60 * 60 }
  );

  res.set("X-Auth", signed);
  return res.status(200).json({ data: response.data });
};

export const testProtected = (req, res) => {
  console.log(req.user);
  return res.status(300).json({ data: "OK" });
};

export const status = async (req, res) => {
  try {
    const body = req.body;
    let userBody = {
      email: body.email,
      status: body.status,
      loginTime: "",
      lastSeen: Date.now(),
      totalTime: 0,
    };
    const ifUserExist = await cacheMethods.hget("attendance", body.email);
    if (!ifUserExist) {
      userBody.loginTime = timeIST();
    } else {
      const userData = JSON.parse(ifUserExist);
      // userBody.loginTime = userData.loginTime;
      if (body.status == "OUT") {
        userBody.totalTime =
          userData.totalTime + userBody.lastSeen - userData.lastSeen;
      }
    }
    await cacheMethods.hset("attendance",body.email,JSON.stringify(userBody));
    return res.status(200).json({data : "Success True"});
  } catch (error) {
    console.error("Error in status ", error);
    return res.status(500).json({ data: `Error in status ${error}` });
  }
};
