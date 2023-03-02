import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  statuse: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
    comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

blogSchema.virtual("commentObjects", {
  ref: "Comment",
  localField: "comments",
  foreignField: "_id",
  justOne: false,
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
