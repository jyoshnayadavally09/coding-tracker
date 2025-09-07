// Store platform info
let platforms = [
    { name: "LeetCode", api: "https://leetcode-stats-api.herokuapp.com/{username}", username: "" },
    { name: "CodeChef", api: "https://codechef-api.vercel.app/{username}", username: "" },
    { name: "HackerEarth", api: "https://he-api.vercel.app/{username}", username: "" }
];

// Load profile from your website
async function loadProfile() {
    const websiteURL = document.getElementById("website-link").value;
    try {
        const res = await fetch(websiteURL + "/api/profile");
        const data = await res.json();
        document.getElementById("profile-img").src = data.avatar || "default.jpg";
        document.getElementById("profile-name").textContent = data.name;
        document.getElementById("profile-bio").textContent = data.bio || "";
    } catch (error) {
        alert("Error loading profile from website");
    }
}

// Render platform progress
function renderPlatforms() {
    const container = document.getElementById("platforms-container");
    container.innerHTML = "";
    platforms.forEach(p => {
        let card = document.createElement("div");
        card.className = "platform-card";
        card.innerHTML = `
            <h3>${p.name}</h3>
            <svg class="progress-circle" viewBox="0 0 36 36">
                <path stroke="#eee" stroke-width="3" fill="none" d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"></path>
                <path id="circle-${p.name}" stroke="#4caf50" stroke-width="3" fill="none"
                      stroke-dasharray="0, 100"
                      d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"></path>
            </svg>
            <p id="stats-${p.name}">Loading...</p>
        `;
        container.appendChild(card);
    });
}

// Fetch stats for all platforms
async function fetchStats() {
    for (let p of platforms) {
        if (!p.username) continue;
        try {
            const url = p.api.replace("{username}", p.username);
            const res = await fetch(url);
            const data = await res.json();

            let solved = data.totalSolved || data.rating || 0;
            let percentage = Math.min((solved / 500) * 100, 100); // Assuming 500 target
            document.getElementById(`stats-${p.name}`).textContent = `Solved: ${solved}`;
            document.getElementById(`circle-${p.name}`).setAttribute("stroke-dasharray", `${percentage}, 100`);
        } catch (err) {
            document.getElementById(`stats-${p.name}`).textContent = "Error fetching";
        }
    }
}

// Initialize
renderPlatforms();
fetchStats();
