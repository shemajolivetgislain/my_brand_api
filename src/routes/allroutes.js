import express from "express";
import blogRoute from "./blogroute.js";
import userRoute from "./user_route.js"
import contactRoute from "./querieroute.js";
import loginRoute from "./loginroute.js";
const router = express.Router();

router.use("/blogs", blogRoute);
router.use("/users", userRoute);
router.use("/queries", contactRoute);
router.use("/login",loginRoute);
export default router;
