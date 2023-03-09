import Comment from "../model/comment.js";
import Blog from "../model/blog.js";
import jwt from "jsonwebtoken";

class commentcontroller{
static async createComment (req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
  const { username } = verifyToken;
  try {
    const blogId = req.params.id;
    const NewComment = await Comment.create({
      fullName: username,
      comment: req.body.comment,
      blog: blogId,
    });
    const BlogPost = await Blog.findById(blogId);
    BlogPost.comments.push(NewComment);
    await BlogPost.save(function (error) {
      res.status(201).json({
        ok: true,
        message: "New comment",
        data: BlogPost,
        commentId: NewComment,
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal sever error",
    });
  }
};

static async getSingleComment (req, res) {
  try {
    const BlogId = req.params.id;
    // const getBlog = await Blog.findById(BlogId);
    const comments = await Comment.find({ blog: BlogId });
    // if (!getComment) return res.status(404).json({ error: "No Comment Found" });
    res.status(200).json({
      message: "comments of this blog",
      // blog: getBlog,
      comments,
      // counter: getComment.comments.length,
      // data: getComment.comments,
    });
  } catch (error) {
    res.status(500).json({
      // error: `No comments with this id ${req.params.id}`,
      msg: error.message,
    });
  }
};
}




export default commentcontroller;
