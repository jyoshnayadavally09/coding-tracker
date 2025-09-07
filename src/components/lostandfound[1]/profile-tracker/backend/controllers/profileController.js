const { fetchGitHubData } = require("../services/githubService");

const getGitHubProfile = async (req, res) => {
    try {
        const username = req.params.username;
        const data = await fetchGitHubData(username);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching profile" });
    }
};

module.exports = { getGitHubProfile };
