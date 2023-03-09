import request from "supertest";
import app from "../src/server_test.js";
import Blog from "../src/model/blog.js";

describe("Blog Test", () => {
  let token;
  let res;
  beforeAll(async () => {
    await request(app)
      .post("/login")
      .send({
        email: "jolivet@gmail.com",
        password: "Sms@2020",
      })
      .then((res) => {
        token = res.body.token;
      });
  }, 50000);
  describe("Returns the blog", () => {
    it("Returns all blogs", async () => {
      res = await request(app).get("/blogs");
      expect(res.status).toBe(200);
    }, 50000);

    it("Return a single blog with wrong id", async () => {
      const obj = new Blog();
      res = await request(app).get("/blogs/" + obj._id);
      expect(res.status).toBe(404);
    }, 50000);

    it("Returns a single blog with invalid id", async () => {
      res = await request(app).get("/blogs/id83665");
      expect(res.status).toBe(500);
    }, 50000);
  });

  describe("Updates the blog", () => {
    it("should update the blog", async () => {
      const obj = new Blog();
      res = await request(app)
        .patch("blogs/" + obj._id)
        .set("Authorization", "Bearer " + token)
        .send({
          title: "Testing",
          body: "Testing",
          author: "tester",
          category: "web-test",
          image: "image.jpg",
          statuse: "published",
        });
      expect(res.status).toBe(201);
    }, 50000);
    it("Update a blog with wrong id", async () => {
      res = await request(app)
        .put("blogs/63e242f05d62f6ab919ee136")
        .set("Authorization", "Bearer " + token)
        .send({
          title: "Testing",
          body: "Testing",
          author: "tester",
          category: "web-test",
          image: "image.jpg",
          statuse: "published",
        });
      expect(res.status).toBe(404);
    }, 50000);

    it("Update a blog with invalid id", async () => {
      res = await request(app)
        .put("blogs/update/gdggdgd")
        .set("Authorization", "Bearer " + token)
        .send({
          title: "Testing",
          body: "Testing",
          author: "tester",
          category: "web-test",
          image: "image.jpg",
          statuse: "published",
        });
      expect(res.status).toBe(500);
    }, 50000);
  });

  describe("Delete a blog", () => {
    it("Delete a blog with correct id", async () => {
      res = await request(app)
        .delete("/blogs/delete/id")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    });

    it("Delete a blog with incorrect id", async () => {
      const obj = await new Blog();
      res = await request(app)
        .delete("/blogs/" + obj._id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    });

    it("Delete a blog with invalid id", async () => {
      res = await request(app)
        .delete("/blogs/delete/id")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    });
  });
});
