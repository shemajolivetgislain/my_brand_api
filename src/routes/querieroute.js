import express from "express";
import contactController from "../controllers/queriescontroller.js";
import userRestriction from "../middleware/isadminCheck.js";

const router = express.Router();

router.get("/", userRestriction, contactController.getContact);
router.post("/", contactController.createContact);
router.delete("/:id", userRestriction, contactController.deleteContact);

export default router;
