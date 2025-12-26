import config from "../config/config.js";
import cacheMethods from "../redis/methods.js";
import { cronJob } from "../utils/cron.js";
import { attendance } from "../models/attendance.js";
import DBMethod from "../db/methods.js";
import time from "../utils/time.js";

export async function attendanceAtNight(){
  cronJob("0 23 * * *", async () => {
    try {
      const getAllAttendance = await cacheMethods.hgetAll(
        config.ATTENDANCE_REDIS_KEY
      );
      const parsed = Object.fromEntries(
        Object.entries(getAllAttendance).map(([k, v]) => [k, JSON.parse(v)])
      );
      const keys = Object.keys(parsed);
      console.log("Got keys ", keys);
      let todayAttendance = [];
      for (let i = 0; i < keys.length; i++) {
        const count = await cacheMethods.get(keys[i]);
        let userMap = {
          email: keys[i],
          workingHours: time.convertToHourAndMinute(parsed[keys[i]].totalTime),
          logInTime: parsed[keys[i]].loginTime,
          logOutTime: time.getTimeInIST(parsed[keys[i]].lastSeen),
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
