// src/components/TargetCard.jsx
import React from "react";
import "./TargetCard.css";

const TargetCard = ({ platform, logo, link, target }) => {
  return (
    <div className="target-card">
      <img src={logo} alt={platform} className="target-logo" />
      <h3>{platform}</h3>
      <p>Target Problems: {target}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="visit-btn">
        Visit {platform}
      </a>
    </div>
  );
};

export default TargetCard;
