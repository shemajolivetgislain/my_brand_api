import express from "express";
import loginController from "../controllers/loginController.js"
import validateLogin from "../middleware/validation/loginValidation.js";
const router = express.Router();

router.post("/", validateLogin, loginController);

export default router;