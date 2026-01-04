import express from "express";
import { getPresignedUrl } from "../utils/s3.js";

const router = express.Router();

router.get("/s3/presigned-url", async (req, res) => {
    const { fileType, folder } = req.query;

    const data = await getPresignedUrl(fileType, folder);
    res.json(data);
});

export default router;
