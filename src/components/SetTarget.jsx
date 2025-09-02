import React, { useState, useEffect } from "react";

const platforms = [
  { name: "LeetCode", key: "leetUsername", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png", color: "#6a0dad" },
  { name: "Codeforces", key: "cfUsername", logo: "https://sta.codeforces.com/s/69949/images/codeforces-sponsored-by-ton.png", color: "#1e90ff" },
  { name: "CodeChef", key: "ccUsername", logo: "data:image/webp;base64,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", color: "#f0932b" },
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
