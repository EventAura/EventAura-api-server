import express from "express";

import {
  HackathonRegistration,
  PaidHackathonStatus,
} from "../controllers/HackathonRegistrationController.js";

const HackathonRegistrationRoute = express.Router();

HackathonRegistrationRoute.post(
  "/hackathon/registration/:id",
  HackathonRegistration
);
HackathonRegistrationRoute.post(
  "/hackathon/status/:merchantId/:merchantTransactionId/:hackathonId",
  PaidHackathonStatus
);

export default HackathonRegistrationRoute;
