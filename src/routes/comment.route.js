import express from "express";
import commentController from "../controllers/commentcontroller.js";
import userVerification from "../middleware/isusercheck.js";

const router = express.Router();

router.post("/:id/comment", commentController.createComment);
router.get("/:id/comments", commentController.getSingleComment);

export default router;
