import { useState, useEffect } from "react";
import "./TopNav.css";

function TopNav() {
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
  }, []);

  // ✅ Apply theme + save preference
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="topnav">
      <h2 className="app-title">🚀 Coding Tracker</h2>

      <div className="topnav-right">
        
        {/* Profile Image */}
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="profile-img"
        />
      </div>
    </div>
  );
}

export default TopNav;
