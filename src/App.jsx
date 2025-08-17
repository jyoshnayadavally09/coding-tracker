// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import components
import Sidebar from "./components/sidebar";
import Dashboard from "./components/Dashboard";
import LeetCode from "./components/LeetCode";
import Codeforces from "./components/Codeforces";
import Profile from "./components/profile";
import SetTarget from "./components/SetTarget";
import Login from "./components/Login";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: "flex" }}>
        {/* Sidebar shows only if logged in */}
        {localStorage.getItem("isLoggedIn") && <Sidebar />}

        {/* Main content */}
        <div className="main-content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            {/* Public Dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/leetcode"
              element={
                <ProtectedRoute>
                  <LeetCode />
                </ProtectedRoute>
              }
            />
            <Route
              path="/codeforces"
              element={
                <ProtectedRoute>
                  <Codeforces />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/set-target"
              element={
                <ProtectedRoute>
                  <SetTarget />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
