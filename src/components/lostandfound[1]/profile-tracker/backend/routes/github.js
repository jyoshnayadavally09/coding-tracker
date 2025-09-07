import express from "express";
import { getGitHubStats } from "../services/githubService.js";

const router = express.Router();

router.get("/:username", async (req, res) => {
    try {
        const stats = await getGitHubStats(req.params.username);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch GitHub stats" });
    }
});

export default router;
