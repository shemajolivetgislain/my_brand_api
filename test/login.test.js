import request from "supertest";
import app from "../src/server_test.js";

// describe("UserController Test", () => {
//   describe("signupUser", () => {
//     it("should log in a user if he/she has an account", async () => {
//       const userToLogin = {
//         email: "jolivet@gmail.com",
//         password: "password@123",
//       };
//       const username = "jolivet";
//       try {
//         const responses = await request(app)
//           .post("/login")
//           .send(userToLogin)
//           .expect(200);
//         expect(responses.body.message).toEqual(
//           `${username} you are welcome........`
//         );
//       } catch (error) {
//         const errors = await request(app)
//           .get("/login")
//           .send(userToLogin)
//           .expect(400);
//         expect(errors.body.message).toEqual("you have to do a signup");
//       }
//     });
//   });
// });

jest.setTimeout(60000);
describe("Testing the loginController", () => {
  describe("Log a User in", () => {
    it("should log a user if they already have an account", async () => {
      const userToSignin = {
        email: "jolivet@gmail.com",
        password: "password@123",
      };
      try {
        const response = await request(app).post("/login").send(userToSignin);
        expect(response.statusCode).toBe(200);
      } catch (error) {
        const err = await request(app).post("/login").send(userToSignin);
        expect(err.statusCode).toBe(404);
      }
    });

    afterEach(() => {
      // handle unhandled promise rejections
      if (global.process.listenerCount("unhandledRejection") > 0) {
        global.process.removeAllListeners("unhandledRejection");
      }
    });
  });
});
