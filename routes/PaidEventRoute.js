import express from "express";
import {
  PaidEventRegistration,
  PaidEventStatus,
} from "../controllers/PaidEventRegistration.js";

const paidEventRouter = express.Router();

paidEventRouter.post("/phone-pay/registration/user/:id", PaidEventRegistration);
paidEventRouter.post(
  "/phone-pay/status/:merchantId/:merchantTransactionId/:eventId",
  PaidEventStatus
);

export default paidEventRouter;
