import { Schema, model } from "mongoose";

const attendanceSchema = new Schema({
  todayAttendance: [
    {
      staff: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      workingHours: {
        type: Number,
        required: true,
        default: 0,
      },
    }, 
  ],
},{
    timestamps : true
})

// TTL INDEX → delete document 62 days after updatedAt
attendanceSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 62 * 24 * 60 * 60 });

export const attendance = model("Attendance",attendanceSchema)
