import express from 'express';
import cors from 'cors';
import { getGithubStats } from './services/github.js';
import { getLeetCodeStats } from './services/leetcode.js';
import { getCodeforcesStats } from './services/codeforces.js';
import { getHackerRankStats } from './services/hackerrank.js';

const app = express();
app.use(cors());
app.use(express.json());

let profiles = {
  github: '',
  leetcode: '',
  codeforces: '',
  hackerrank: ''
};

// Save profiles from frontend
app.post('/api/saveProfiles', (req, res) => {
  profiles = req.body;
  res.json({ message: 'Profiles saved successfully', profiles });
});

// Fetch stats
app.get('/api/stats', async (req, res) => {
  try {
    const [github, leetcode, codeforces, hackerrank] = await Promise.all([
      profiles.github ? getGithubStats(profiles.github) : null,
      profiles.leetcode ? getLeetCodeStats(profiles.leetcode) : null,
      profiles.codeforces ? getCodeforcesStats(profiles.codeforces) : null,
      profiles.hackerrank ? getHackerRankStats(profiles.hackerrank) : null
    ]);
    res.json({ github, leetcode, codeforces, hackerrank });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
