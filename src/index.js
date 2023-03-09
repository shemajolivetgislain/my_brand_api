import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import allRoutes from "./routes/allroutes.js";
import response from "./utils/response.utils.js";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import docs from "./documentations/index.js";


mongoose.set("strictQuery", true);

// configuring dotenv
dotenv.config();

// create server instance
const app = express();

// use of cors and body parse
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) =>
  response.success(res, 200, "Welcome To My_brand Backend [API]")
);
// api documentation
app.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));
app.use(allRoutes);
const port = process.env.PORT;
mongoose.set("strictQuery", true);

mongoose.connect(`${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(port);
