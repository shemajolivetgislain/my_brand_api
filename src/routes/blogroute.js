import express from "express";
import blogController from "../controllers/blogcontrollers.js";
import userRestriction from "../middleware/isadminCheck.js";
import userVerification from "../middleware/isusercheck.js";
import validateBlog from "../middleware/validation/blogvalidation.js";

const router = express.Router();

router.get("/", blogController.getBlogs);
router.get("/published", blogController.getPublishedBlogs);
router.get("/unpublished", blogController.getNotPublishedBlogs);
router.get("/:id", blogController.getBlogDetail);
router.post(
  "/",
  userVerification,
  // validateBlog,
  blogController.createBlog
);
router.put("/update/:id", userRestriction, blogController.updateBlog);
router.delete("/delete/:id", userRestriction, blogController.deleteBlog);

export default router;
