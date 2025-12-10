import { Router } from "express";

const router = Router();

router.route("/signin").post();

router.route("/status").post();

router.route("/check").post();

router.route("/attendance").get();

router.route("/totalAttendance").get();

export default router;
