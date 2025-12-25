import { Router } from "express";
import { testProtected,status,internetStatus } from "../controller/controller.js";


const router = Router();


router.route("/").get(testProtected);

router.route("/status").post(status); // v1/protected/status

router.route("/check").post(internetStatus);

// router.route("/attendance").get();

// router.route("/totalAttendance").get();

export default router

