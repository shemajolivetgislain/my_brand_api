import express from "express";
import blogRoute from "./blogroute.js";
import userRoute from "./user_route.js"
import contactRoute from "./querieroute.js";
import loginRoute from "./loginroute.js";
import commentRoute from "./comment.route.js";
// import logoutRoute from "./logout.route.js";
import SwaggerUi from "swagger-ui-express";
// import documentation from "../docs/swaggerOptions.js";
const router = express.Router();

// router.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(documentation));

router.use("/blogs", blogRoute);
router.use("/users", userRoute);
router.use("/queries", contactRoute);
router.use("/login",loginRoute);
// router.use("/logout", logoutRoute);
router.use("/blog", commentRoute);
export default router;
