import request from "supertest";
import app from "../src/server_test.js";
import Blog from "../src/model/blog.js";
import jwt from "jsonwebtoken";

describe("find a blog", () => {
  test("should return 404 when the blog does not exist", async () => {
    const find = await request(app).get("/blogs/noIdProvided");
    expect(find.status).toBe(404);
    expect(find.body.message).toBe(
      `The blog with id:noIdProvided is not found`
    );
  });
});

describe("Single blog", () => {
  test("should return the blog if it exists", async () => {
    const singleBlog = await Blog.create({
      title: "added by the admin",
      author: "admin",
      category: "website",
      statuse: "published",
      body: "body by the admin",
      image: "images.png",
    });
    const response = await request(app).get(`/blogs/${singleBlog._id}`);

    expect(response.body.message).toBe("The blog was found");
    expect(response.status).toBe(200);
    expect(response.body.data.author).toBe("admin");
    expect(response.body.data.title).toBe("added by the admin");
    expect(response.body.data.body).toBe("body by the admin");
  });
});

describe("All blogs", () => {
  test("should display all blogs in the database", async () => {
    const itemsLength = await Blog.find();
    const allLength = itemsLength.length;
    const blog1 = await Blog.create({
      title: "insert blog 1 ",
      author: "admin",
      category: "website",
      statuses: "published",
      body: "body by the admin",
      image: "images.png",
    });
    const blog2 = await Blog.create({
      title: "insert blog 2 ",
      author: "admin",
      category: "website",
      statuses: "published",
      body: "body by the admin",
      image: "images.png",
    });
    const response = await request(app).get("/blogs");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      `All blogs available are:${allLength + 2}`
    );
    expect(response.body.data.length).toBe(allLength + 2);
    expect(response.body.data[allLength + 1].author).toBe(
      "test if it is working"
    );
  });
});

describe("Creating Blog", () => {
  test("should create a new blog", async () => {
    const response = await request(app)
      .post("/blogs")
      .field("author", "author")
      .field("title", "title")
      .field("statuse", "statuse")
      .field("category", "category")
      .field("body", "body")
      .field("image", "image");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("blog created successfully");
  });
});

describe("Deleting blog", () => {
  test("should delete a blog if user is admin", async () => {
    const newBlog = await Blog.create({
      title: "insert blog 1 ",
      author: "admin",
      category: "website",
      statuses: "published",
      body: "body by the admin",
      image: "images.png",
    });

    const token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY);

    const response = await request(app)
      .delete(`/blogs/${newBlog.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("blog deleted successful");

    const deletedBlog = await Blog.findById(newBlog.id);
    expect(deletedBlog).toBeFalsy();
  });

  test("should not delete a blog if user is not admin", async () => {
    const newBlog = await Blog.create({
      title: "insert blog 1 ",
      author: "admin",
      category: "website",
      statuses: "published",
      body: "body by the admin",
      image: "images.png",
    });

    const token = jwt.sign({ role: "user" }, process.env.SECRET_KEY);

    const response = await request(app)
      .delete(`/blogs/${newBlog.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("UNAUTHORIZED");

    const deletedBlog = await Blog.findById(newBlog.id);
    expect(deletedBlog).toBeTruthy();
  });
});
