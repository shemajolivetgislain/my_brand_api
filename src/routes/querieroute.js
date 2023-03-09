import express from "express";
import contactController from "../controllers/queriescontroller.js";
import userRestriction from "../middleware/isadminCheck.js";
import verifyContact from "../middleware/validation/verifycontact.js";

const router = express.Router();

router.get("/messages", userRestriction, contactController.getContact);
router.post("/", verifyContact, contactController.createContact);
router.delete("/:id", userRestriction, contactController.deleteContact);

export default router;
