import express from "express";
import { getHomeModels } from "../controllers/homeController.js";

const router = express.Router();

router.get("/home", getHomeModels);

export default router;
