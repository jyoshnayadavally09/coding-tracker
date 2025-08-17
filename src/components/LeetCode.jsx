import { useState, useEffect } from "react";

function LeetCode() {
  const [username, setUsername] = useState(localStorage.getItem("leetUsername") || "");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (username) fetchProfile(username);
  }, [username]);

  const fetchProfile = async (uname) => {
    if (!uname) return;
    setLoading(true);
    setError("");
    setProfile(null);

    try {
      // Try fetching from the unofficial API
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${uname}`);
      if (!response.ok) throw new Error("API fetch failed");
      const data = await response.json();
      setProfile(data);
      localStorage.setItem("leetUsername", uname);
    } catch (err) {
      console.warn("API failed, using mock data", err);
      setError("Could not fetch real data, showing mock stats.");
      // MOCK DATA fallback
      const mockData = {
        username: uname,
        totalSolved: 120,
        totalQuestions: 200,
        easySolved: 50,
        mediumSolved: 60,
        hardSolved: 10,
        ranking: 3456,
      };
      setProfile(mockData);
    } finally {
      setLoading(false);
    }
  };

  const handleSetUsername = () => {
    const uname = prompt("Enter your LeetCode username:", username);
    if (!uname) return;
    setUsername(uname);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💻 LeetCode Profile</h2>

      {!username && <button onClick={handleSetUsername}>Set LeetCode Username</button>}

      {username && (
        <>
          <p>
            Username: {username} <button onClick={handleSetUsername}>Change</button>
          </p>

          {loading && <p>Loading profile...</p>}
          {error && <p style={{ color: "orange" }}>{error}</p>}

          {profile && !loading && (
            <div className="profile-card" style={{ marginTop: "20px" }}>
              <h3>{profile.username}</h3>
              <p>Total Solved: {profile.totalSolved} / {profile.totalQuestions}</p>
              <p>Easy: {profile.easySolved} | Medium: {profile.mediumSolved} | Hard: {profile.hardSolved}</p>
              <p>Global Ranking: {profile.ranking}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LeetCode;
