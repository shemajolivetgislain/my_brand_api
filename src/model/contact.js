import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
