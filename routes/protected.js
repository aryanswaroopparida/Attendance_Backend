import { Router } from "express";
import { testProtected,status,internetStatus,monthAttendance ,attendanceOfIndividual } from "../controller/controller.js";


const router = Router();


router.route("/").get(testProtected);

router.route("/status").post(status); // v1/protected/status

router.route("/check").post(internetStatus);

router.route("/attendanceOfIndividual/:email/:currentMonth").get(attendanceOfIndividual);

router.route("/totalAttendance/:currentMonth").get(monthAttendance);

export default router

