import { Schema, model } from "mongoose";

const attendanceSchema = new Schema(
  {
    todayAttendance: [
      {
        email: { type: String, required: true },
        workingHours: {
          type: Number,
          required: true,
          default: 0,
        },
        logInTime: {
          type: String,
        },
        logOutTime:{
          type: String,
        },
        count: {
          type: Number,
          default: 0,
          required: true,
        },
        attendance: {
          type: Boolean,
          default: false,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// TTL INDEX → delete document 62 days after updatedAt
attendanceSchema.index(
  { updatedAt: 1 },
  { expireAfterSeconds: 62 * 24 * 60 * 60 }
);

export const attendance = model("Attendance", attendanceSchema);
