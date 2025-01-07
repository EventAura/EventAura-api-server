import { createOrganiser } from "../controllers/OrganiserController.js";
import express from "express";

const OrganiserRouter = express.Router();

OrganiserRouter.post("/create", createOrganiser);

export default OrganiserRouter;



