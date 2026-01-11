import axios from "axios";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import cacheMethods from "../redis/methods.js";
import time from "../utils/time.js";
import DBMethod from "../db/methods.js";
import { attendance } from "../models/attendance.js";

export const signIn = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const response = await axios.post("https://dextraa.vercel.app/api/login", {
      email: body.email,
      password: body.password,
    });
    console.log(response.data);
    response.data.user.latitude = 13; // temp
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
  } catch (error) {
    console.error("Error in signIn ", error);
    return res.status(400).json({ data: "Failed to signIn" });
  }
};

export const testProtected = (req, res) => {
  console.log(req.user);
  return res.status(300).json({ data: "OK" });
};

export const status = async (req, res) => {
  try {
    const body = req.body;
    let userBody = {
      status: body.status,
      loginTime: "",
      lastSeen: Date.now(),
      totalTime: 0,
    };
    const ifUserExist = await cacheMethods.hget(
      config.ATTENDANCE_REDIS_KEY,
      body.email
    );
    if (!ifUserExist) {
      userBody.loginTime = time.getTimeInIST();
      await cacheMethods.set(body.email, 1);
    } else {
      const userData = JSON.parse(ifUserExist);
      userBody.loginTime = userData.loginTime;
      if (body.status == "OUT") {
        userBody.totalTime =
          userData.totalTime + userBody.lastSeen - userData.lastSeen;
      }
    }
    await cacheMethods.hset(
      config.ATTENDANCE_REDIS_KEY,
      body.email,
      JSON.stringify(userBody)
    );
    return res.status(200).json({ data: "Success True" });
  } catch (error) {
    console.error("Error in status ", error);
    return res.status(500).json({ data: `Error in status ${error}` });
  }
};

export const internetStatus = async (req, res) => {
  try {
    const body = req.body;
    await cacheMethods.incr(body.email);
    return res.status(200).json({ data: "internetStatus Success" });
  } catch (error) {
    console.error("Error in internetStatus ", error);
    return res.status(500).json({ data: `Error in internetStatus ${error}` });
  }
};

export const monthAttendance = async (req, res) => {
  try {
    const { currentMonth } = req.params;
    let data;
    if (currentMonth == "true")
      data = await DBMethod.findAll(
        attendance,
        time.getDateTimeWithDay(1, 0, 0)
      );
    else {
      const now = new Date();
      data = await DBMethod.findAll(
        attendance,
        time.getDateTimeWithDay(1, 0, 0, now.getMonth() - 1),
        time.getDateTimeWithDay(0, 23, 59, now.getMonth())
      );
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error in monthAttendance ", error);
    res.status(500).json({ data: "Error in monthAttendance" });
  }
};

export const attendanceOfIndividual = async (req, res) => {
  try {
    const { email, currentMonth } = req.params;
    const createdAt = {};
    const now = new Date();
    if (currentMonth == "true") {
      createdAt.$gte = time.getDateTimeWithDay(1, 0, 0);
    } else {
      createdAt.$gte = time.getDateTimeWithDay(1, 0, 0, now.getMonth() - 1);
      createdAt.$lte = time.getDateTimeWithDay(0, 23, 59, now.getMonth());
    }
    const data = await attendance.aggregate([
      {
        $match: {
          createdAt:createdAt,
          "todayAttendance.email": email,
        },
      },
      {
        $project: {
          _id: 0,
          createdAt: 1,
          todayAttendance: {
            $filter: {
              input: "$todayAttendance",
              as: "att",
              cond: { $eq: ["$$att.email", email] },
            },
          },
        },
      },
    ]);
    return res.status(200).json({data:data})
  } catch (error) {
    console.error("Error in attendanceOfIndividual ",error);
    return res.status(500).json({data: "Error in attendanceOfIndividual "})
  }
};
