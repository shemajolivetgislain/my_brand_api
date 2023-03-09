import errorFunc from "../utils/errorFunc.js";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import bcrypt from "bcrypt";

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // this way finding the user that matches to the email from the body
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    } else {
      // here is a way to check of password in body is the same as password in database
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      } else {
        // here in our in this sign function we pass user id and secret key in hashed so that we can use them in verification
        const token = jwt.sign(
          { username: user.username, email: user.email, role: user.role},
          process.env.SECRET_KEY
        );
        return res.status(200).json({
          ok: true,
          message: "login successful",
          token: token,
          data: { username: user.username, email: user.email, role: user.role},
        });
      }
    }
  } catch (error) {}
};

export default loginController;
