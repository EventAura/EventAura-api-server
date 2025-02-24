import express from "express";
import {
  hackathonPostController,
  hackathonsGetController,
  hackathonUpdateController,
  hackathonDeleteController,
  hackathonGetSingleController,
} from "../controllers/HackathonController.js";

const hackathonRouter = express.Router();

hackathonRouter.post("/hackathon", hackathonPostController);
hackathonRouter.get("/hackathon", hackathonsGetController);
hackathonRouter.get("/hackathon/:id", hackathonGetSingleController);
hackathonRouter.patch("/hackathon/:id", hackathonUpdateController);
hackathonRouter.delete("/hackathon/:id", hackathonDeleteController);

export default hackathonRouter;
