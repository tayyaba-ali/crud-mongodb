import express from "express";
const router = express.Router();
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  createUser,
} from "../controllers/userController.js";

router.get("/users",getAllUsers);
router.post("/user",createUser);
router.get("/user/:id",getUser);
router.delete("/user/:id",deleteUser)
router.put("/user/:id",updateUser)

export default router
