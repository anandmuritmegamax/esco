import express from "express";
import {
    getMasters,
    createMaster,
    updateMaster,
    deleteMaster,
} from "../controllers/masterController.js";

const router = express.Router();

router.get("/admin/masters", getMasters);
router.post("/admin/masters", createMaster);
router.put("/admin/masters/:id", updateMaster);
router.delete("/admin/masters/:id", deleteMaster);

export default router;
