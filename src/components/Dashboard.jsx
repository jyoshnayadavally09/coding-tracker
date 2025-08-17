import { useState } from "react";
import ProfileCard from "./ProfileCard";

export default function Dashboard() {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async ({ leetcode, codeforces }) => {
    const results = [];

    if (leetcode) {
      const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcode}`);
      const data = await res.json();
      results.push({
        title: "LeetCode",
        username: leetcode,
        stats: { solved: data.totalSolved, rating: null }
      });
    }

    if (codeforces) {
      const res = await fetch(`https://codeforces.com/api/user.info?handles=${codeforces}`);
      const data = await res.json();
      results.push({
        title: "Codeforces",
        username: codeforces,
        stats: { solved: null, rating: data.result[0].rating }
      });
    }

    setProfiles(results);
  };

  return (
    <div className="dashboard-container">
      <h1>My Coding Profiles</h1>
      <div className="platforms">
        {profiles.map((p, idx) => (
          <ProfileCard key={idx} {...p} />
        ))}
      </div>
    </div>
  );
}
