import {
  getParticipants,
  getParticipantById,
  getParticipantsByEvent,
  getUserEntryStatus,
  updateUserEntryStatus,
  getParticipantsByClerkEvent
} from "../controllers/ParticipantsController.js";
import express from "express";

const ParticipantRouter = express.Router();

ParticipantRouter.get("/participants", getParticipants);
ParticipantRouter.get("/participant/:id", getParticipantById);
ParticipantRouter.get("/participants/event/:id", getParticipantsByEvent);
ParticipantRouter.get("/participant/status/:id", getUserEntryStatus);
ParticipantRouter.patch("/participant/updateStatus/:id", updateUserEntryStatus);
ParticipantRouter.get("/participant/event/clerk/:eventId", getParticipantsByClerkEvent);

export default ParticipantRouter;
