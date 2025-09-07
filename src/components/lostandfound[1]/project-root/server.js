const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// API to save profile
app.post("/save-profile", (req, res) => {
    const profilePath = path.join(__dirname, "profile.json");
    fs.writeFile(profilePath, JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            console.error("Error saving profile:", err);
            return res.status(500).json({ message: "Failed to save profile" });
        }
        res.json({ message: "Profile saved successfully" });
    });
});

// API to get profile
app.get("/get-profile", (req, res) => {
    const profilePath = path.join(__dirname, "profile.json");
    if (fs.existsSync(profilePath)) {
        res.sendFile(profilePath);
    } else {
        res.json({});
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
