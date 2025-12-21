import { Router } from "express";
import { signIn } from "../controller/controller.js";
import { auth } from "../middlewares/middleware.js";
import protectedRouter from "./protected.js";

const router = Router();

router.route("/signin").post(signIn);

router.use("/protected",auth,protectedRouter);


export default router;
