import register from "../../model/user.js";
import response from "../../utils/response.utils.js";
import joi from "joi";

const registerSchema = joi.object({
  username: joi.string().required().messages({
    "string.empty": "Please enter the username",
    "any.required": "username field can not be empty",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Email can not be empty",
    "string.email": "Please provide valid email..",
    "any.required": "Email is required",
  }),

  password: joi.string().min(6).max(300).required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: joi.string().min(6).max(300).required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const verifyEmailOrUsername = (req, res, next) => {
  const { email, username } = req.body;
  const { error } = registerSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return response.error(res, 400, errorMessage);
  }
  register.findOne({ $or: [{ email }, { username }] }, (err, result) => {
    if (err) {
      return response.error(res, 500, err);
    }
    if (result) {
      return response.error(res, 400, "username or email is already Exists");
    }
    next();
  });
};

export default verifyEmailOrUsername;
