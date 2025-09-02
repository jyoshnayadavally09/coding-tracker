import React, { useState } from "react";

function Codeforces() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [solvedCount, setSolvedCount] = useState(0);
  const [error, setError] = useState("");

  const fetchCodeforcesData = async () => {
    if (!username) return;

    try {
      setError("");
      setUserData(null);
      setSolvedCount(0);

      // 1. Get user profile info
      const profileRes = await fetch(
        `https://codeforces.com/api/user.info?handles=${username}`
      );
      const profileData = await profileRes.json();

      if (profileData.status === "FAILED") {
        setError("⚠️ User not found!");
        return;
      }

      const user = profileData.result[0];
      setUserData(user);

      // 2. Get submissions
      const submissionsRes = await fetch(
        `https://codeforces.com/api/user.status?handle=${username}`
      );
      const submissionsData = await submissionsRes.json();

      if (submissionsData.status === "OK") {
        // Count unique solved problems
        const solvedSet = new Set();
        submissionsData.result.forEach((sub) => {
          if (sub.verdict === "OK") {
            solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        });
        setSolvedCount(solvedSet.size);
      }
    } catch (err) {
      setError("❌ Failed to fetch data. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔥 Codeforces Tracker</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Codeforces username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={fetchCodeforcesData}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Track
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold">{userData.handle}</h3>
          <p>Rank: <strong>{userData.rank || "Unrated"}</strong></p>
          <p>Rating: <strong>{userData.rating || "Unrated"}</strong></p>
          <p>Max Rating: <strong>{userData.maxRating || "N/A"}</strong></p>
          <p>Contribution: <strong>{userData.contribution}</strong></p>
          <p className="mt-2 text-green-600">
            ✅ Solved Problems: <strong>{solvedCount}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Codeforces;
