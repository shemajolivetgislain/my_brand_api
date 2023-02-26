import express from "express";
import contactController from "../controllers/queriescontroller.js";

const router = express.Router();

router.get("/", contactController.getContact);
router.post("/", contactController.createContact);
router.delete("/:id", contactController.deleteContact);

export default router;
