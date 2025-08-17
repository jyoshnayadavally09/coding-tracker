// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <h2 className="logo">🚀 Tracker</h2>
      <nav>
        <ul>
          <li><Link to="/profile">👤 Profile</Link></li>
          <li><Link to="/set-target">🎯 Set Target</Link></li>
          <li><Link to="/leetcode">💻 LeetCode</Link></li>
          <li><Link to="/codeforces">⚡ Codeforces</Link></li>
        </ul>
      </nav>
      <button className="logout" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
