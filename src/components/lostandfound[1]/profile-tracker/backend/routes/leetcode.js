import express from "express";
import { getLeetCodeStats } from "../services/leetcodeService.js";

const router = express.Router();

router.get("/:username", async (req, res) => {
    try {
        const stats = await getLeetCodeStats(req.params.username);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch LeetCode stats" });
    }
});

export default router;
