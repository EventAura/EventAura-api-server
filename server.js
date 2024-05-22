import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ConnectDb from "./utils/ConnectDb.js";
import eventRouter from "./routes/EventRouter.js";
// env file configuration
dotenv.config({ path: "./utils/.env" });

const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
ConnectDb();

// routes
app.get("/", (req, res) => {
  res.json("API is running...");
});

// Event Router
app.use("/", eventRouter);

// server
app.listen(process.env.PORT, () => {
  console.log(`server is runing on port ${process.env.PORT}`);
});
