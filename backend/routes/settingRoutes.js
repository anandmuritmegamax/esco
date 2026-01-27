import express from "express";
import {
    getSettings,
    updateSettings,
} from "../controllers/settingController.js";

const router = express.Router();

router.get("/admin/settings", getSettings);              // public + admin
router.put("/admin/settings", updateSettings);           // admin only

export default router;
