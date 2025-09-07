const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // Must be different from your React app's port

// Enable CORS for all origins, allowing your React app to connect
app.use(cors());

// LeetCode's official GraphQL API endpoint
const LEETCODE_API_URL = "https://leetcode.com/graphql";

// GraphQL query to get user data
const LEETCODE_GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
  }
`;

// Your backend API endpoint
app.get('/api/leetcode/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const response = await fetch(LEETCODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: LEETCODE_GRAPHQL_QUERY,
        variables: { username: username },
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch from LeetCode API" });
    }

    const data = await response.json();

    if (!data.data.matchedUser) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Server-side fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});