import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { deleteUser, getAllUsers, updateUserDetail } from "../controllers/users/users.js";
const router = express.Router();

router.get("/getAllUsers", verifyToken, getAllUsers);
router.put("/update/:id", verifyToken, updateUserDetail)
router.delete("/delete/:id", verifyToken, deleteUser)

export default router;