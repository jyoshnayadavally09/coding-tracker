// src/components/Codeforces.jsx
import { useState } from "react";

function Codeforces() {
  const [handle, setHandle] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    if (!handle) return;
    setLoading(true);

    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      const data = await response.json();
      setProfile(data.result[0]);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Codeforces Profile</h2>
      <input
        type="text"
        placeholder="Enter Codeforces handle"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <button onClick={fetchProfile}>Load Profile</button>

      {loading && <p>Loading...</p>}

      {profile && (
        <div className="profile-card">
          <h3>{profile.handle}</h3>
          <p>Rating: {profile.rating}</p>
          <p>Max Rating: {profile.maxRating}</p>
          <p>Rank: {profile.rank}</p>
        </div>
      )}
    </div>
  );
}

export default Codeforces;
