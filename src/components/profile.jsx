import { useEffect, useState } from "react";
import "./Profile.css"; // We'll style with a separate CSS file

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card center">
          <h3>No user logged in</h3>
          <p>Please log in first to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-left">
          <img src={user.photo || "https://via.placeholder.com/150"} alt={user.username} className="profile-pic" />
          <div className="work-info">
            <h4>Work</h4>
            <p>Primary: {user.primaryWork || "Spotify New York"}</p>
            <p>Secondary: {user.secondaryWork || "Metropolitan Museum"}</p>
          </div>
          <div className="skills">
            <h4>Skills</h4>
            <p>{user.skills?.join(", ") || "Branding, UI/UX, Web Design"}</p>
          </div>
        </div>
        <div className="profile-right">
          <h2>{user.username}</h2>
          <p className="role">{user.role || "Product Designer"}</p>
          <p className="ranking">Ranking: {user.ranking || "8.6 ★★★★☆"}</p>
          <div className="buttons">
            <button>Send Message</button>
            <button>Contacts</button>
          </div>
          <div className="contact-info">
            <h4>Contact Information</h4>
            <p>Phone: {user.phone || "+1 123 456 7890"}</p>
            <p>Email: {user.email || "hello@example.com"}</p>
            <p>Address: {user.address || "525 E 68th Street, New York, NY"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
