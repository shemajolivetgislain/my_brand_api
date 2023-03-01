import Contact from "../model/contact.js";
import errorFunc from "../utils/errorFunc.js";

class contactController {
  static async getContact(req, res) {
    try {
      const queries = await Contact.find();
      res.status(200).json({
        data: queries,
      });
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  static async createContact(req, res) {
    try {
      const { names, email, subject, content } = req.body;
      const newQuery = await Contact.create({
        names,
        email,
        subject,
        content,
      });
      res.status(201).json({
        message: "New query created successfully",
        data: newQuery,
      });
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  static async deleteContact(req, res) {
    try {
      const { id } = req.params;
      // find blog

      const _id = id;

      const queryToBeDeleted = await Contact.findByIdAndDelete(_id);

      if (!queryToBeDeleted) {
        return res.status(404).json({
          message: `Contact with id: ${id} was not found`,
        });
      } else {
        return res.status(200).json({
          message: "Contact deleted successfully",
        });
      }
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
}

export default contactController;
