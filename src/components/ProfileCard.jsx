// src/components/ProfileCard.jsx
import React from "react";
import "./Profile.css";

const ProfileCard = ({ name, location, job, university, friends, photos, comments, image }) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={image} alt={name} className="profile-img" />
      </div>
      <div className="profile-body">
        <h3>{name}</h3>
        <p>{location}</p>
        <p>{job}</p>
        <p>{university}</p>
        <div className="profile-stats">
          <span>{friends} Friends</span>
          <span>{photos} Photos</span>
          <span>{comments} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
