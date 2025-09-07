import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/fetch-profile", async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).json({ error: "No URL provided" });

        const response = await fetch(url);
        const html = await response.text();

        res.send(html);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
