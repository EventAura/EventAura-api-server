import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cron from "node-cron";
import https from "https";
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

// Ping server function
const pingServer = () => {
  return new Promise((resolve, reject) => {
    https
      .get("https://tesract-server.onrender.com", (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          if (res.statusCode === 200) {
            resolve(data);
          } else {
            reject(
              new Error(`Server responded with status code ${res.statusCode}`)
            );
          }
        });
      })
      .on("error", (err) => {
        reject(new Error(`Request failed: ${err.message}`));
      });
  });
};

// Cron Job to ping the server every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("Pinging server...");
    const response = await pingServer();
    console.log("Ping successful:", response);
  } catch (error) {
    console.error("Ping failed:", error.message);
  }
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
