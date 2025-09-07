async function getLeetCodeStats(username) {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    const data = await res.json();
    return data.totalSolved || 0;
}
