import React, { useState, useEffect } from "react";

const TargetCard = ({ platform, logo, link, target }) => {
  const [username, setUsername] = useState("");

  // Load stored LeetCode username on mount
  useEffect(() => {
    if (platform === "LeetCode") {
      const stored = localStorage.getItem("leetUsername");
      if (stored) setUsername(stored);
    }
  }, [platform]);

  const handleVisitProfile = () => {
    if (platform === "LeetCode") {
      const uname = prompt("Enter your LeetCode username:", username);
      if (!uname) return;
      setUsername(uname);
      localStorage.setItem("leetUsername", uname);
      window.open(`https://leetcode.com/${uname}`, "_blank");
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <div style={{ margin: "10px", border: "1px solid #ccc", padding: "10px", width: "200px" }}>
      <img src={logo} alt={platform} style={{ width: "100px" }} />
      <h3>{platform}</h3>
      {platform === "LeetCode" && username && <p>Username: {username}</p>}
      <p>Target: {target} problems</p>
      <button onClick={handleVisitProfile}>
        {platform === "LeetCode" ? "Visit Profile" : "Go"}
      </button>
    </div>
  );
};

export default TargetCard;
