import React, { useState, useEffect } from "react";
import "./set.css";

const platforms = [
  {
    name: "LeetCode",
    key: "leetUsername",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
    color: "#6a0dad",
  },
  {
    name: "Codeforces",
    key: "cfUsername",
    logo: "https://sta.codeforces.com/s/69949/images/codeforces-sponsored-by-ton.png",
    color: "#1e90ff",
  },
  {
    name: "CodeChef",
    key: "ccUsername",
    logo: "https://cdn.codechef.com/sites/all/themes/abessive/cc-logo.png",
    color: "#f0932b",
  },
  {
    name: "HackerRank",
    key: "hrUsername",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
    color: "#2ecc71",
  },
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
        const res = await fetch(
          `https://leetcode-api-faisalshohag.vercel.app/${uname}`
        );
        if (!res.ok) throw new Error("LeetCode API failed");
        const apiData = await res.json();

        data = {
          username: apiData.username || apiData.name || uname,
          totalSolved: apiData.totalSolved,
          totalQuestions: apiData.totalQuestions,
          easySolved: apiData.easySolved,
          mediumSolved: apiData.mediumSolved,
          hardSolved: apiData.hardSolved,
          ranking: apiData.ranking,
        };
      } else if (platform === "Codeforces") {
        const res = await fetch(
          `https://codeforces.com/api/user.status?handle=${uname}`
        );
        const apiData = await res.json();

        if (apiData.status !== "OK") throw new Error("Codeforces fetch failed");

        const solvedSet = new Set();
        apiData.result.forEach((sub) => {
          if (sub.verdict === "OK") {
            solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        });

        data = {
          username: uname,
          totalSolved: solvedSet.size,
          totalQuestions: 5000, // dummy total
          easySolved: "-",
          mediumSolved: "-",
          hardSolved: "-",
          ranking: "-",
        };
      } else if (platform === "CodeChef") {
        // TODO: Replace with real API if available
        data = {
          username: uname,
          totalSolved: 120, // placeholder
          totalQuestions: 500,
          easySolved: "-",
          mediumSolved: "-",
          hardSolved: "-",
          ranking: "-",
        };
      } else if (platform === "HackerRank") {
        // TODO: Replace with real API if available
        data = {
          username: uname,
          totalSolved: 80, // placeholder
          totalQuestions: 300,
          easySolved: "-",
          mediumSolved: "-",
          hardSolved: "-",
          ranking: "-",
        };
      }

      setUsers((prev) => ({ ...prev, [storageKey]: data }));
      localStorage.setItem(storageKey, uname);
    } catch (err) {
      console.warn(`${platform} fetch failed`, err);
      setError((prev) => ({
        ...prev,
        [storageKey]: `Could not fetch ${platform} data`,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [storageKey]: false }));
    }
  };

  const handleSetUsername = (platform, storageKey) => {
    const uname = prompt(
      `Enter your ${platform} username:`,
      localStorage.getItem(storageKey) || ""
    );
    if (!uname) return;
    fetchProfile(platform, storageKey, uname);
  };

  return (
    <div className="content">
      <h2>🎯 Check your performance </h2>
      <div className="cards-container">
        {platforms.map((p) => {
          const user = users[p.key];
          const load = loading[p.key];
          const err = error[p.key];
          const solvedPercentage = user
            ? Math.floor((user.totalSolved / user.totalQuestions) * 100)
            : 0;

          return (
            <div key={p.key} className="card">
              <img src={p.logo} alt={p.name} style={{ height: "40px" }} />
              <h3 style={{ color: p.color }}>{p.name}</h3>

              {!user && !load && (
                <button onClick={() => handleSetUsername(p.name, p.key)}>
                  Set Username
                </button>
              )}

              {user && (
                <>
                  <p>
                    Username: <strong>{user.username}</strong>{" "}
                    <button onClick={() => handleSetUsername(p.name, p.key)}>
                      Change
                    </button>
                  </p>
                  {load && <p>Loading...</p>}
                  {err && <p style={{ color: "orange" }}>{err}</p>}
                  {!load && !err && (
                    <>
                      <p>
                        Total Solved: {user.totalSolved} /{" "}
                        {user.totalQuestions}
                      </p>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${solvedPercentage}%`,
                            background: p.color,
                          }}
                        ></div>
                      </div>
                      <p>
                        Easy: {user.easySolved} | Medium: {user.mediumSolved} |
                        Hard: {user.hardSolved}
                      </p>
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
