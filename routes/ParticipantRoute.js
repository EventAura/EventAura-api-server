import {
  getParticipants,
  getParticipantById,
} from "../controllers/ParticipantsController.js";
import express from "express";

const ParticipantRouter = express.Router();

ParticipantRouter.get("/participants", getParticipants);
ParticipantRouter.get("/participant/:id", getParticipantById);

export default ParticipantRouter;
