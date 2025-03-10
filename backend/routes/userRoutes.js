import express from "express";
const router = express.Router();
import {
  getAllUsers,
  updateUser,
  deleteUser,
  login,
  signup,
} from "../controllers/userController.js";

router.get("/users",getAllUsers);
router.post("/signup",signup);
router.post("/login",login);
router.delete("/user/:id",deleteUser)
router.put("/user/:id",updateUser)

export default router
