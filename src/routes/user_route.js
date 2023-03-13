import express from "express";
import userController from "../controllers/usercontroller.js";
import verifyRegister from "../middleware/validation/uservalidation.js"
import isadminCheck from "../middleware/isadminCheck.js";

const router = express.Router();

router.post("/", verifyRegister, userController.registerUser);
router.get("/", isadminCheck, userController.getAllUsers);
router.put("/:id", isadminCheck, userController.updateUser);
router.delete("/:id", isadminCheck, userController.deleteUser);
export default router;
