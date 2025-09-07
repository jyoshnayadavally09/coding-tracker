import axios from 'axios';

export async function getLeetCodeStats(username) {
  const query = `
    {
      matchedUser(username: "${username}") {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;
  const res = await axios.post('https://leetcode.com/graphql', { query });
  const stats = res.data.data.matchedUser.submitStats.acSubmissionNum;

  return {
    platform: 'LeetCode',
    username,
    problemsSolved: stats.reduce((sum, obj) => sum + obj.count, 0)
  };
}
