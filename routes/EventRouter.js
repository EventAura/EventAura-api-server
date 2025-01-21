import express from "express";
import {
  EventPostController,
  EventGetController,
  EventGetSingleController,
  EventLoginController,
  EventPatchController,
  EventGetClerkController,
  EventGetClerkSingleController,
} from "../controllers/EventController.js";

const eventRouter = express.Router();

eventRouter.post("/event", EventPostController);
eventRouter.get("/event", EventGetController);
eventRouter.get("/event/:id", EventGetSingleController);
eventRouter.post("/event/login/:id", EventLoginController);
eventRouter.patch("/event/:id", EventPatchController);
eventRouter.get("/event/clerk/:clerkId", EventGetClerkController);
eventRouter.get("/event/clerk/:clerkId/:eventId", EventGetClerkSingleController);

export default eventRouter;
