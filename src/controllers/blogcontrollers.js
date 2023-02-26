import Blog from "../model/blogs.js";
import errorFunc from "../utils/errorFunc.js";

class blogController {
  static async getBlogs(req, res) {
    try {
      const blogs = await Blog.find();
      res.status(200).json({
        data: blogs,
      });
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // get one blog
  static async getBlog(req, res) {
    try {
      const { id } = req.params; // using ES6
      const blog = await Blog.findOne({ _id: id });
      if (!blog) {
        return res.status(404).json({
          message: `Blog with id: ${id} was not found`,
        });
      } else {
        return res.status(200).json({
          data: blog,
        });
      }
    } catch (error) {
      console.log(error.message);
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
  static async createBlog(req, res) {
    try {
      const { title, author, category, statuse, body } = req.body;
      const newBlog = await Blog.create({
        title,
        author,
        category,
        statuse,
        body,
      });
      res.status(201).json({
        message: "New blog created successfully",
        data: newBlog,
      });
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

    static async updateBlog(req, res) {
      try {
        const { id } = req.params; // using ES6

        // body to be update
        const { title, author, category, statuse, body } = req.body;

        // id
        const _id = id;
        const blogUpdated = await Blog.findByIdAndUpdate(
          _id,
          { title, author, category, statuse, body},
          { new: true }
        );

        if (!blogUpdated) {
          return res.status(404).json({
            message: `Blog with id: ${id} was not found`,
          });
        } else {
          return res.status(200).json({
            message: "Blog updated Successfully",
            data: blogUpdated,
          });
        }
      } catch (error) {
        const messageContent = error.message;
        const status = 500;
        errorFunc(res, messageContent, status);
      }
    }

    static async deleteBlog(req, res) {
      try {
        const { id } = req.params;
        // find blog

        const _id = id;

        const blogToBeDeleted = await Blog.findByIdAndDelete(_id);

        if (!blogToBeDeleted) {
          return res.status(404).json({
            message: `Blog with id: ${id} was not found`,
          });
        } else {
          return res.status(200).json({
            message: "Blog deleted successfully",
          });
        }
      } catch (error) {
        const messageContent = error.message;
        const status = 500;
        errorFunc(res, messageContent, status);
      }
    }
}

export default blogController;
