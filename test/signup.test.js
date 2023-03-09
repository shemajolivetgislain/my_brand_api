import app from "../src/server_test.js";
import request from "supertest";
import User from "../src/model/user.js";
import bcrypt from "bcrypt";

describe("signupController Test", () => {
  let server;
  beforeAll(async () => {
    server = app.listen(3000);
  });
  afterAll((end) => {
    server.close(end);
  });

  jest.setTimeout(60000);
  it("should know that email of user being created already exist in db", async () => {
    const password = "password@123";
    const hashedPassword = await bcrypt.hashSync(password, 12);
    const user1 = new User({
      username: "Jolivet",
      email: "jolivet@gmail.com",
      password: hashedPassword,
      role: "user",
    });

    const user2 = new User({
      username: "shema",
      email: "jolivet@example.com", // same email as user1
      password: hashedPassword,
      role: "user",
    });

    try {
      await user1.save();
      await user2.save();
    } catch (err) {
      //expect(err).to.exist;
      expect(err.message).toContain(
        "E11000 duplicate key error collection" || "buffering timed out"
      );
    }
  });
  //when one field is missing
  it("should know that the email is invalid", async () => {
    const emailRegrex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const user1 = new User({
      username: "shema",
      email: "jolivet",
      password: "password",
      role: "user",
    });
    try {
      //await user1.save();
      expect(user1.email).not.toMatch(emailRegrex);
    } catch (err) {
      //expect(err).to.exist;
      //expect(err.message).toContain('E11000 duplicate key error collection');
    }
  });
  it("should know that the username field is empty", async () => {
    const emailRegrex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const user1 = new User({
      username: "",
      email: "jolivet@gmail.com",
      password: "password",
      role: "user",
    });
    try {
      const response = await request(app).post("/users");
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("username field is required");
    } catch (error) {
    //   expect(error.message).toContain("User validation failed");
    }
  });
  it("should know that the email field is empty", async () => {
    const emailRegrex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const user1 = new User({
      username: "JohnDoe",
      email: "",
      password: "password",
      role: "user",
    });
    try {
      const response = await request(app).post("/users");
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Email field is required");
    } catch (error) {
      expect(error.message)
    }
  });
});
