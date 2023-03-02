import joi from "joi";
import response from "../../utils/response.utils.js";

const userSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "Email can not be empty",
    "string.email": "Please provide valid email..",
    "any.required": "Email is required",
  }),
  password: joi.string().required().messages({
    "string.empty": "Password field can not be empty",
    "any.required": "Password field can not be empty",
  }),
});

const verifyLogin = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return response.error(res, 400, errorMessage);
  }
  next();
};

export default verifyLogin;
