import express from "express";
import {
  signup,
  loginUser,
  getAllUserData,
} from "../controllers/auth-controller.js";
import { errorCatcher } from "../middleware/error-catcher.js";
import jwtVerify from "../middleware/jwt-verify.js";

const router = express.Router();

router.get("/", jwtVerify(), errorCatcher(getAllUserData));
router.post("/signup", errorCatcher(signup));
router.post("/login", errorCatcher(loginUser));

export { router as authRoutes };
