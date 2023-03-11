import Blog from "../model/blog.js";
import errorFunc from "../utils/errorFunc.js";
import successMessage from "../utils/successMessage.js";
import response from "../utils/response.utils.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import jwt from "jsonwebtoken";
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
  static async getBlogDetail(req, res) {
    try {
      const { id } = req.params; // using ES6
      const blog = await Blog.findOne({ _id: id })
        .populate("commentObjects")
        .exec();
      if (!blog) {
        return res.status(404).json({
          message: `Blog with id: ${id} was not found`,
        });
      } else {
        return res.status(200).json({
          data: {
            title: blog.title,
            author: blog.author,
            category: blog.category,
            statuse: blog.statuse,
            body: blog.body,
            image: blog.image,
            comment: blog.commentObjects,
          },
        });
      }
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
  static async createBlog(req, res) {
    // here is grabbing token that are in header
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const { username } = verifyToken;
    cloudinary.config({
      cloud_name: "dja5pnddu",
      api_key: "762757296578451",
      api_secret: "p1MbWpXuz3imxfVlYpBM34mYIDU",
    });
    try {
      const storage = new CloudinaryStorage({
        cloudinary,
        params: {
          folder: "blogs-image",
          allowed_formats: ["jpg", "png"],
        },
      });
      const upload = multer({ storage }).single("image");
      upload(req, res, async (err) => {
        if (err) {
          return console.log(err);
        }
        const { title, category, statuse, body } = req.body;
        const newBlog = await Blog.create({
          author: username,
          title,
          category,
          statuse,
          image: req.file.path,
          body,
        });
        response.success(res, 200, "blog created successfuly", newBlog);
      });
    } catch (error) {
      console.log(error);
      return response.error(res, 500, "internal server error");
    }
  }
  // static async createBlog(req, res) {
  //   // here is grabbing token that are in header
  //   const authHeader = req.headers.authorization;
  //   const token = authHeader.split(" ")[1];
  //   const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
  //   const { username } = verifyToken;
  //   dotenv.config();
  //   cloudinary.config({
  //     cloud_name: "dja5pnddu",
  //     api_key: "762757296578451",
  //     api_secret: "p1MbWpXuz3imxfVlYpBM34mYIDU",
  //   });

  //   try {
  //     const storage = new CloudinaryStorage({
  //       cloudinary,
  //       params: {
  //         folder: "blogs-image",
  //         allowed_formats: ["jpg", "png"],
  //       },
  //     });
  //     const upload = multer({ storage }).single("image");
  //     upload(req, res, async (err) => {
  //       if (err) {
  //         return console.log(err);
  //       }
  //       const { title, category, statuse, body } = req.body;
  //       const newBlog = await Blog.create({
  //         title,
  //         author: username,
  //         category,
  //         statuse,
  //         image: req.file.path,
  //         body,
  //       });
  //       return res
  //         .status(201)
  //         .json({ ok: true, message: "New blog created successfully" });
  //     });
  //   } catch (error) {
  //     const messageContent = error.message;
  //     const status = 500;
  //     errorFunc(res, messageContent, status);
  //   }
  // }

  static async updateBlog(req, res) {
    try {
      const { id } = req.params; // using ES6

      // body to be update
      const { title, author, category, statuse, body } = req.body;

      // id
      const _id = id;
      const blogUpdated = await Blog.findByIdAndUpdate(
        _id,
        { title, author, category, statuse, body },
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
