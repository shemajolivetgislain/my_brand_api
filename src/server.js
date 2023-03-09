import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import allRoutes from "./routes/allroutes.js";
import response from "./utils/response.utils.js"
import swaggerDocs from "./documentation/index.js";
import docs from "./documentations/index.js";
import documentation from "./docs/swaggerOptions.js";
mongoose.set("strictQuery", false);

// configuring dotenv
dotenv.config();

// create server instance
const app = express();

// use of cors and body parse
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) =>
  response.success(res, 200, "Welcome To My_brand Backend [API]")
);
app.use("/api", allRoutes);

// api documentation
app.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(documentation));
// define some variables
const port = process.env.PORT;
const host = process.env.HOST;

// database connection instance
const con = () =>
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// instance to listen to our server
const startServer = () => app.listen(port);

Promise.all([con(), startServer()])
  .then(() => {
    
    console.log(
      `MongoDB connected and server listening at http://${host}:${port}`
    );
  })
  .catch((err) => console.log(err));


// module.exports = app;