import express from "express";
import {
  EventPostController,
  EventGetController,
  EventGetSingleController,
  EventLoginController,
  EventPatchController,
} from "../controllers/EventController.js";

const eventRouter = express.Router();

eventRouter.post("/event", EventPostController);
eventRouter.get("/event", EventGetController);
eventRouter.get("/event/:id", EventGetSingleController);
eventRouter.post("/event/login/:id", EventLoginController);
eventRouter.patch("/event/:id", EventPatchController);

export default eventRouter;
