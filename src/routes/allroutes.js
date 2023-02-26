import express from "express";
import blogRoute from "./blogroute.js";
import userRoute from "./user_route.js"
import contactRoute from "./querieroute.js";
const router = express.Router();

router.use("/blogs", blogRoute);
router.use("/users", userRoute);
router.use("/queries", contactRoute);
export default router;
