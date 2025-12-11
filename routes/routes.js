import { Router } from "express";
import { signIn } from "../controller/controller.js";

const router = Router();

router.route("/signin").post(signIn);

// router.route("/status").post(auth);

// router.route("/check").post();

// router.route("/attendance").get();

// router.route("/totalAttendance").get();

export default router;
