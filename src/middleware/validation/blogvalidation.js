// import Blog from "../model/blog.js";
import Joi from "joi";

const blogSchema = Joi.object({
  title: Joi.string().min(5).max(30).required().messages({
        'string.empty': 'Title can not be empty',
        'string.Title': 'Please provide valid title..',
        'any.required': 'Title is required'
    }),
  category: Joi.string().min(7).max(300).required().messages({
        'string.empty': 'Category can not be empty',
        'string.category': 'Please provide valid category..',
        'any.required': 'Category is required'
    }),
  statuse: Joi.string().min(7).max(300).required().messages({
        'string.empty': 'statuse can not be empty',
        'string.statuse': 'Please provide valid statuse..',
        'any.required': 'Status is required'
    }),
  body: Joi.string().min(10).max(1000).required().messages({
        'string.empty': 'Body can not be empty',
        'string.body': 'Please provide valid body..',
        'any.required': 'Body is required'
    }),
  image: Joi.string(),
});

const validateBlog = (req, res, next) => {
  const { error, value } = blogSchema.validate(req.body);
  if (error) {
    let errorMsg = error.details.map((detail) => detail.message).join(", ");
    return res.status(400).send({ errorMsg });
  }
  next();
};


export default validateBlog;
