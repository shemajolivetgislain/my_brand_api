import bcrypt from "bcrypt";
import User from "../model/user.js";
import errorFunc from "../utils/errorFunc.js";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create our new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "New User created successfully",
      data: newUser,
    });
  } catch (error) {
    const messageContent = error.message;
    const status = 500;
    errorFunc(res, messageContent, status);
  }
};

export default registerController;
