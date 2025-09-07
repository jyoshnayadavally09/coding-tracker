const backendURL = "http://localhost:5000";

if (document.getElementById('profileForm')) {
  document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      github: e.target.github.value,
      leetcode: e.target.leetcode.value,
      codeforces: e.target.codeforces.value,
      hackerrank: e.target.hackerrank.value
    };
    await fetch(`${backendURL}/api/saveProfiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert('Profiles saved!');
  });
}

if (document.getElementById('statsContainer')) {
  fetch(`${backendURL}/api/stats`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('statsContainer');
      for (let platform in data) {
        if (data[platform]) {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `<h3>${data[platform].platform}</h3>
                            <p>Username: ${data[platform].username}</p>
                            ${Object.entries(data[platform]).map(([k,v]) => k!=="platform" && k!=="username" ? `<p>${k}: ${v}</p>` : '').join('')}`;
          container.appendChild(card);
        }
      }
    });
}
