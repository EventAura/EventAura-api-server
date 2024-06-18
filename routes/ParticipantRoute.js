import {
  getParticipants,
  getParticipantById,
  getParticipantsByEvent,
} from "../controllers/ParticipantsController.js";
import express from "express";

const ParticipantRouter = express.Router();

ParticipantRouter.get("/participants", getParticipants);
ParticipantRouter.get("/participant/:id", getParticipantById);
ParticipantRouter.get("/participants/event/:id", getParticipantsByEvent);

export default ParticipantRouter;
