  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Sidebar from "./components/sidebar";
  import TopNav from "./components/TopNav";
  import Dashboard from "./components/Dashboard";
  import LeetCode from "./components/LeetCode";
  import Codeforces from "./components/Codeforces";
  import Profile from "./components/profile";
  import SetTarget from "./components/SetTarget";
  import Codecheff from "./components/Codecheff";

  function App() {
    return (
      <Router>
        <div className="app-container">
          {/* Top Navigation */}
          <TopNav />

          <div className="layout">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="main-content">
              <Routes>
                <Route path="/" element={<SetTarget />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/codecheff" element={<Codecheff />} />
                <Route path="/leetcode" element={<LeetCode />} />
                <Route path="/codeforces" element={<Codeforces />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/topnav" element={<TopNav />} />
                <Route path="/set-target" element={<SetTarget />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  }

  export default App;
