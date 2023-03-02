import express from "express";
import userController from "../controllers/usercontroller.js";
import verifyRegister from "../middleware/validation/uservalidation.js"

const router = express.Router();

router.post("/", verifyRegister, userController.registerUser);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.updateUser);

export default router;
