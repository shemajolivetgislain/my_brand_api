import bcrypt from "bcrypt";
import User from "../model/user.js";
import errorFunc from "../utils/errorFunc.js";
import response from "../utils/response.utils.js";

class userController {
  static async registerUser(req, res) {
    const { username, email, password, confirmPassword } = req.body;
    try {
      // hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let passwordMatch = bcrypt.compareSync(confirmPassword, hashedPassword);
      if (passwordMatch) {
        // create our new user
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        res.status(201).json({
          ok: true,
          message: "account created successfully",
          data: {
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            password: newUser.password,
          },
        });
      } else {
        response.error(
          res,
          400,
          "password and confirm password does not match"
        );
      }
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(403)
          .json({ message: `This email ${email} was already Exist` });
      }
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({
        message: "List of all users",
        data: users,
      });
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
  // update user
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, email, role } = req.body;
      const _id = id;
      const userUpdate = await User.findByIdAndUpdate(
        _id,
        { username, email, role },
        { new: true }
      );
      if (!userUpdate) {
        return res
          .status(404)
          .json({ message: `User with this Id: ${_id} was not found` });
      } else {
        return res
          .status(200)
          .json({ message: "user updated successfully", data: userUpdate });
      }
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      // find blog

      const _id = id;

      const userToBeDeleted = await User.findByIdAndDelete(_id);

      if (!userToBeDeleted) {
        return res.status(404).json({
          message: `User with id: ${id} was not found`,
        });
      } else {
        return res.status(200).json({
          message: "User deleted successfully",
        });
      }
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
}
export default userController;
