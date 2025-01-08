import { handleClerkWebhook } from "../controllers/OrganiserController.js";
import express from "express";

const OrganiserRouter = express.Router();

OrganiserRouter.post("/create", handleClerkWebhook);

export default OrganiserRouter;
