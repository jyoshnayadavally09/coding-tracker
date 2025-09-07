import express from "express";
import { getCodeforcesStats } from "../services/codeforcesService.js";

const router = express.Router();

router.get("/:username", async (req, res) => {
    try {
        const stats = await getCodeforcesStats(req.params.username);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch Codeforces stats" });
    }
});

export default router;
