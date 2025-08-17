import React, { useState, useEffect } from "react";

const platforms = [
  { name: "LeetCode", key: "leetUsername", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png", color: "#6a0dad" },
  { name: "Codeforces", key: "cfUsername", logo: "https://sta.codeforces.com/s/69949/images/codeforces-sponsored-by-ton.png", color: "#1e90ff" },
  { name: "CodeChef", key: "ccUsername", logo: "https://cdn.codechef.com/sites/default/files/uploads/pictures/6f30933b80590b7d8d4d4a3b7b3e5f07.png", color: "#f0932b" },
  { name: "HackerRank", key: "hrUsername", logo: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png", color: "#2ecc71" },
];

function SetTarget() {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    platforms.forEach((p) => {
      const uname = localStorage.getItem(p.key);
      if (uname) fetchProfile(p.name, p.key, uname);
    });
  }, []);

  const fetchProfile = async (platform, storageKey, uname) => {
    setLoading((prev) => ({ ...prev, [storageKey]: true }));
    setError((prev) => ({ ...prev, [storageKey]: "" }));

    try {
      let data;
      if (platform === "LeetCode") {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${uname}`);
        if (!res.ok) throw new Error("API failed");
        data = await res.json();
      } else {
        // Mock data for other platforms
        data = {
          username: uname,
          totalSolved: Math.floor(Math.random() * 150),
          totalQuestions: 200,
          easySolved: Math.floor(Math.random() * 70),
          mediumSolved: Math.floor(Math.random() * 70),
          hardSolved: Math.floor(Math.random() * 30),
          ranking: Math.floor(Math.random() * 5000),
        };
      }
      setUsers((prev) => ({ ...prev, [storageKey]: data }));
      localStorage.setItem(storageKey, uname);
    } catch (err) {
      console.warn(`${platform} fetch failed`, err);
      setError((prev) => ({ ...prev, [storageKey]: `Could not fetch ${platform} data` }));
    } finally {
      setLoading((prev) => ({ ...prev, [storageKey]: false }));
    }
  };

  const handleSetUsername = (platform, storageKey) => {
    const uname = prompt(`Enter your ${platform} username:`, localStorage.getItem(storageKey) || "");
    if (!uname) return;
    fetchProfile(platform, storageKey, uname);
  };

  return (
    <div className="content">
      <h2>🎯 Set Your Coding Targets</h2>
      <div className="cards-container">
        {platforms.map((p) => {
          const user = users[p.key];
          const load = loading[p.key];
          const err = error[p.key];
          const solvedPercentage = user ? Math.floor((user.totalSolved / user.totalQuestions) * 100) : 0;

          return (
            <div key={p.key} className="card">
              <img src={p.logo} alt={p.name} />
              <h3 style={{ color: p.color }}>{p.name}</h3>

              {!user && !load && <button onClick={() => handleSetUsername(p.name, p.key)}>Set Username</button>}

              {user && (
                <>
                  <p>
                    Username: <strong>{user.username}</strong>{" "}
                    <button onClick={() => handleSetUsername(p.name, p.key)}>Change</button>
                  </p>
                  {load && <p>Loading...</p>}
                  {err && <p style={{ color: "orange" }}>{err}</p>}
                  {!load && (
                    <>
                      <p>Total Solved: {user.totalSolved} / {user.totalQuestions}</p>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${solvedPercentage}%`, background: p.color }}></div>
                      </div>
                      <p>Easy: {user.easySolved} | Medium: {user.mediumSolved} | Hard: {user.hardSolved}</p>
                      <p>Global Ranking: {user.ranking}</p>
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SetTarget;
