import express from "express";
import {
  EventPostController,
  EventGetController,
  EventGetSingleController,
  EventLoginController,
} from "../controllers/EventController.js";

const eventRouter = express.Router();

eventRouter.post("/event", EventPostController);
eventRouter.get("/event", EventGetController);
eventRouter.get("/event/:id", EventGetSingleController);
eventRouter.post("/event/login/:id", EventLoginController);

export default eventRouter;
