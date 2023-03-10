import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import allRoutes from "./routes/allroutes.js";
import response from "./utils/response.utils.js";
import cookieParser from "cookie-parser";
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
app.use(allRoutes);
const port = process.env.PORT;
mongoose.set("strictQuery", true);

mongoose.connect(`${process.env.TEST_MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(port);


export default app;