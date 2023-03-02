import Joi from "joi";
import User from "../database/models/authentication";

const signUpSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(
    new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
  ),
  password: Joi.string().pattern(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
  ),
});

exports.validateSignUp = (req, res, next) => {
  const { error, value } = signUpSchema.validate(req.body);
  if (error) {
    let errorMsg;
    if (error.details[0].path[0] === "email") {
      errorMsg = `Invalid email address`;
    }
    if (error.details[0].path[0] === "password") {
      errorMsg = `weak password`;
    } else {
      errorMsg = error.details[0].message;
    }
    return res.status(400).send({ error: errorMsg });
  }
  next();
};

exports.validateUniqueUser = async (req, res, next) => {
  const existingEmail = await User?.findOne({ email: req.body.email });
  if (existingEmail) {
    return res.status(409).send({
      message: `User with ${existingEmail?.email} already exists`,
    });
  }
  next();
};
