// src/components/Sidebar.jsx
import { Link } from "react-router-dom";


function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
     
      <nav>
        <ul>
          
          <li><Link to="/set-target">🎯 Set Target</Link></li>
          <li><Link to="/leetcode">💻 LeetCode</Link></li>
          <li><Link to="/codeforces">⚡ Codeforces</Link></li>
          <li><Link to="/profile">👤 Profile</Link></li>
        </ul>
      </nav>
      <button className="logout" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
