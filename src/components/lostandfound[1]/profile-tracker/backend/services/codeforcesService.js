import axios from 'axios';

export async function getCodeforcesStats(username) {
  const res = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
  const user = res.data.result[0];

  return {
    platform: 'Codeforces',
    username,
    rating: user.rating || 'Unrated',
    maxRating: user.maxRating || 'Unrated'
  };
}
