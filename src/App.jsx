// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Sidebar from "./components/sidebar";
import Dashboard from "./components/Dashboard";
import LeetCode from "./components/LeetCode";
import Codeforces from "./components/Codeforces";
import Profile from "./components/profile";
import SetTarget from "./components/SetTarget";

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: "flex" }}>
        {/* Sidebar always visible now */}
        <Sidebar />

        {/* Main content */}
        <div className="main-content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leetcode" element={<LeetCode />} />
            <Route path="/codeforces" element={<Codeforces />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/set-target" element={<SetTarget />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
