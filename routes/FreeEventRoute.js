import express from "express";

import FreeEventController from "../controllers/FreeEventRegistration.js";

const FreeEventRouter = express.Router();

FreeEventRouter.post("/registration/:id", FreeEventController);

export default FreeEventRouter;
