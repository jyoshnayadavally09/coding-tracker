const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const profilePath = path.join(__dirname, "profile.json");

// Save Profile
app.post("/saveProfile", (req, res) => {
    fs.writeFile(profilePath, JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            console.error("Error saving profile:", err);
            return res.status(500).json({ message: "Failed to save profile" });
        }
        console.log("Profile saved:", req.body);
        res.json({ message: "Profile saved successfully" });
    });
});

// Get Profile
app.get("/getProfile", (req, res) => {
    if (fs.existsSync(profilePath)) {
        res.sendFile(profilePath);
    } else {
        res.json({});
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
