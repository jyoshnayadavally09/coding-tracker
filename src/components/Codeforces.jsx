import { useState } from "react";

function Codeforces() {
  const [username, setUsername] = useState("");
  const [solvedCount, setSolvedCount] = useState(null);
  const [error, setError] = useState("");

  const fetchSolvedCount = async () => {
    if (!username) return;

    try {
      setError("");
      setSolvedCount(null);

      const res = await fetch(
        `https://codeforces.com/api/user.status?handle=${username}`
      );
      const data = await res.json();

      if (data.status !== "OK") {
        setError("⚠️ User not found!");
        return;
      }

      // Count unique solved problems
      const solvedSet = new Set();
      data.result.forEach((sub) => {
        if (sub.verdict === "OK") {
          solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
        }
      });

      setSolvedCount(solvedSet.size);
    } catch (err) {
      setError("❌ Failed to fetch data. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔥 Codeforces Solved Tracker</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Codeforces username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={fetchSolvedCount}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Track
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {solvedCount !== null && (
        <div className="bg-gray-800 text-white p-4 rounded shadow">
          <p className="text-lg">
            ✅ Total Solved Problems:{" "}
            <strong className="text-green-400">{solvedCount}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Codeforces;
