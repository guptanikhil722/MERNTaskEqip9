import { checkDuplicateNumber } from "../middleware/verifySignUp.js";
import { signup, signin, signout } from "../controllers/auth/auth.js";
import express from "express";

const router = express.Router();

router.post("/register", checkDuplicateNumber, signup);
router.post("/login", signin);
router.post("/logout", signout);

export default router;