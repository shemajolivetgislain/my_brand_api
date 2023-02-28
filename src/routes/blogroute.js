import express from "express";
import blogController from "../controllers/blogcontrollers.js";
import userRestriction from "../middleware/isadminCheck.js";
import userVerification from "../middleware/isusercheck.js";

const router = express.Router();

router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlog);
router.post("/", userRestriction, userVerification, blogController.createBlog);
router.put("/:id", userRestriction, blogController.updateBlog);
router.delete("/:id", userRestriction, blogController.deleteBlog);

export default router;
