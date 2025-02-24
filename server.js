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
import OrganiserRouter from "./routes/OrganiserRoute.js";
import hackathonRouter from "./routes/HackathonRouter.js";
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

// Organiser Router
app.use("/", OrganiserRouter);

// Paid event Router

app.use("/api", paidEventRouter);

// Free Event Route
app.use("/", FreeEventRouter);

// Participant Router
app.use("/", ParticipantRouter);

// Hackathon Router
app.use("/api/v1", hackathonRouter);

//not needed in development branch

// cron.schedule("*/10 * * * *", async () => {
//   try {
//     console.log("Pinging server...");
//     const response = await axios.get(
//       "https://eventaura-server-api.onrender.com"
//     );
//     console.log("Ping successful:", response.data);
//   } catch (error) {
//     console.error("Ping failed:", error.message);
//   }
// });
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
