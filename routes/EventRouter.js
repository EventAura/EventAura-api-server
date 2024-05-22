import express from "express";
import {
  EventPostController,
  EventGetController,
  EventGetSingleController,
} from "../controllers/EventController.js";

const eventRouter = express.Router();

eventRouter.post("/event", EventPostController);
eventRouter.get("/event", EventGetController);
eventRouter.get("/event/:id", EventGetSingleController);

export default eventRouter;
