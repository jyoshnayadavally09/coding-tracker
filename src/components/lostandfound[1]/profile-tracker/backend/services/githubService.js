import axios from 'axios';

export async function getGithubStats(username) {
  const repos = await axios.get(`https://api.github.com/users/${username}/repos`);
  const repoCount = repos.data.length;
  const totalStars = repos.data.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  return {
    platform: 'GitHub',
    username,
    repos: repoCount,
    stars: totalStars
  };
}
