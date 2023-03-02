import joi from "joi";
import response from "../../utils/response.utils.js";

const contactSchema = joi.object({
  names: joi.string().min(5).max(30).required().messages({
    "string.empty": "names can not be empty",
    "string.names": "Please provide valid names..",
    "any.required": "names is required",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Email can not be empty",
    "string.email": "Please provide valid email..",
    "any.required": "Email is required",
  }),
  subject: joi.string().min(7).max(300).required().messages({
    "string.empty": "subject can not be empty",
    "string.subject": "Please provide valid subject..",
    "any.required": "Subject is required",
  }),
  content: joi.string().min(10).max(500).required().messages({
    "string.empty": "Body can not be empty",
    "string.content": "Please provide valid content..",
    "any.required": "Body is required",
  }),
});

const verifyContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.content);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return response.error(res, 400, errorMessage);
  }
  next();
};

export default verifyContact;
