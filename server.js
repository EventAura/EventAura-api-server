import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cron from "node-cron";
import axios from "axios";
import ConnectDb from "./utils/ConnectDb.js";
import eventRouter from "./routes/EventRouter.js";
import FreeEventRouter from "./routes/FreeEventRoute.js";
import ParticipantRouter from "./routes/ParticipantRoute.js";
import paidEventRouter from "./routes/PaidEventRoute.js";
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

// Paid event Router

app.use("/api", paidEventRouter);

// Free Event Route
app.use("/", FreeEventRouter);

// Participant Router
app.use("/", ParticipantRouter);

cron.schedule("*/10 * * * *", async () => {
  try {
    console.log("Pinging server...");
    const response = await axios.get("https://tesract-server.onrender.com");
    console.log("Ping successful:", response.data);
  } catch (error) {
    console.error("Ping failed:", error.message);
  }
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
