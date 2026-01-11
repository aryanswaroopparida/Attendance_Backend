import config from "../config/config.js";
import cacheMethods from "../redis/methods.js";
import { cronJob } from "../utils/cron.js";
import { attendance } from "../models/attendance.js";
import DBMethod from "../db/methods.js";
import time from "../utils/time.js";

export async function attendanceAtNight() {
  cronJob("0 23 * * *", async () => {
    try {
      const getAllAttendance = await cacheMethods.hgetAll(
        config.ATTENDANCE_REDIS_KEY
      );

      let todayAttendance = [];
      for (const key in getAllAttendance) {
        const count = await cacheMethods.get(key);
        const parsedData = JSON.parse(getAllAttendance[key]);
        let userMap = {
          email: key,
          workingHours: time.convertToHourAndMinute(parsedData.totalTime),
          logInTime: parsedData.loginTime,
          logOutTime: time.getTimeInIST(parsedData.lastSeen),
          count: count,
          attendance: count < config.THRESHOLD_COUNT ? false : true,
        };
        todayAttendance.push(userMap);
      }

      console.log(todayAttendance);
      await Promise.all([
        DBMethod.create(attendance, { todayAttendance }),
        cacheMethods.flushDB(),
      ]);
    } catch (error) {
      console.error("Error in saving today's attendance ", error);
    }
  });
}
