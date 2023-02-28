import express from "express";
import userController from "../controllers/usercontroller.js";

const router = express.Router();

router.post("/", userController.registerUser);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.updateUser);

export default router;
