import { useState, useEffect } from "react";
import "./Leet.css";

// ✅ Extended Roadmap Data
const roadmap = [
  {
    topic: "Arrays",
    questions: [
      { id: "two-sum", title: "Two Sum", link: "https://leetcode.com/problems/two-sum/" },
      { id: "best-stock", title: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { id: "max-subarray", title: "Maximum Subarray", link: "https://leetcode.com/problems/maximum-subarray/" },
      { id: "merge-intervals", title: "Merge Intervals", link: "https://leetcode.com/problems/merge-intervals/" },
      { id: "product-except-self", title: "Product of Array Except Self", link: "https://leetcode.com/problems/product-of-array-except-self/" },
    ],
  },
  {
    topic: "Strings",
    questions: [
      { id: "valid-anagram", title: "Valid Anagram", link: "https://leetcode.com/problems/valid-anagram/" },
      { id: "longest-substring", title: "Longest Substring Without Repeating Characters", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { id: "palindrome-substring", title: "Longest Palindromic Substring", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
      { id: "group-anagrams", title: "Group Anagrams", link: "https://leetcode.com/problems/group-anagrams/" },
    ],
  },
  {
    topic: "Linked List",
    questions: [
      { id: "reverse-ll", title: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: "merge-ll", title: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { id: "cycle-detect", title: "Linked List Cycle", link: "https://leetcode.com/problems/linked-list-cycle/" },
      { id: "remove-nth", title: "Remove Nth Node From End", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
    ],
  },
  {
    topic: "Trees",
    questions: [
      { id: "max-depth", title: "Maximum Depth of Binary Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { id: "same-tree", title: "Same Tree", link: "https://leetcode.com/problems/same-tree/" },
      { id: "invert-tree", title: "Invert Binary Tree", link: "https://leetcode.com/problems/invert-binary-tree/" },
      { id: "path-sum", title: "Path Sum", link: "https://leetcode.com/problems/path-sum/" },
    ],
  },
  {
    topic: "Graphs",
    questions: [
      { id: "clone-graph", title: "Clone Graph", link: "https://leetcode.com/problems/clone-graph/" },
      { id: "course-schedule", title: "Course Schedule", link: "https://leetcode.com/problems/course-schedule/" },
      { id: "islands", title: "Number of Islands", link: "https://leetcode.com/problems/number-of-islands/" },
      { id: "rotten-oranges", title: "Rotting Oranges", link: "https://leetcode.com/problems/rotting-oranges/" },
    ],
  },
  {
    topic: "Dynamic Programming",
    questions: [
      { id: "climb-stairs", title: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/" },
      { id: "house-robber", title: "House Robber", link: "https://leetcode.com/problems/house-robber/" },
      { id: "coin-change", title: "Coin Change", link: "https://leetcode.com/problems/coin-change/" },
      { id: "lis", title: "Longest Increasing Subsequence", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
    ],
  },
];

function LeetCode() {
  const [username, setUsername] = useState(localStorage.getItem("leetUsername") || "");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Track completed questions
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("leetCompleted")) || {}
  );

  useEffect(() => {
    if (username) fetchProfile(username);
  }, [username]);

  // ✅ Save completed roadmap progress
  useEffect(() => {
    localStorage.setItem("leetCompleted", JSON.stringify(completed));
  }, [completed]);

  const fetchProfile = async (uname) => {
    if (!uname) return;
    setLoading(true);
    setError("");
    setProfile(null);

    try {
      const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${uname}`);
      if (!response.ok) throw new Error("LeetCode API fetch failed");

      const data = await response.json();

      const profileData = {
        username: data.username,
        totalSolved: data.totalSolved,
        totalQuestions: data.totalQuestions,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
        ranking: data.ranking,
      };

      setProfile(profileData);
      localStorage.setItem("leetUsername", uname);
    } catch (err) {
      console.error(err);
      setError("Could not fetch real data, showing mock stats.");
      setProfile({
        username: uname,
        totalSolved: 120,
        totalQuestions: 200,
        easySolved: 50,
        mediumSolved: 60,
        hardSolved: 10,
        ranking: 3456,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSetUsername = () => {
    const uname = prompt("Enter your LeetCode username:", username);
    if (!uname) return;
    setUsername(uname);
  };

  // ✅ Toggle roadmap question completion
  const toggleComplete = (id) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ Global progress
  const totalQuestions = roadmap.reduce((acc, sec) => acc + sec.questions.length, 0);
  const solvedCount = Object.values(completed).filter(Boolean).length;
  const overallPercent = Math.floor((solvedCount / totalQuestions) * 100);

  return (
    <div className="leetcode-container">
      <h2>💻 LeetCode Profile</h2>

      {!username && <button onClick={handleSetUsername}>Set LeetCode Username</button>}

      {username && (
        <>
          <p>
            Username: {username}{" "}
            <button onClick={handleSetUsername}>Change</button>
          </p>

          {loading && <p>Loading profile...</p>}
          {error && <p style={{ color: "orange" }}>{error}</p>}

          {profile && !loading && (
            <>
              <div className="profile-card">
                <h3>{profile.username}</h3>
                <p>
                  Total Solved: {profile.totalSolved} / {profile.totalQuestions}
                </p>
                <p>
                  Easy: {profile.easySolved} | Medium: {profile.mediumSolved} | Hard:{" "}
                  {profile.hardSolved}
                </p>
                <p>Global Ranking: {profile.ranking}</p>
              </div>

              {/* ✅ Global Progress */}
              <div className="roadmap" style={{ marginTop: "30px" }}>
                <h2>📊 Overall Progress</h2>
                <p>
                  {solvedCount} / {totalQuestions} completed ({overallPercent}%)
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${overallPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* ✅ Roadmap Section */}
              <div className="roadmap">
                <h2>🛣️ DSA Roadmap</h2>
                {roadmap.map((section, idx) => {
                  const total = section.questions.length;
                  const done = section.questions.filter((q) => completed[q.id]).length;
                  const percent = Math.floor((done / total) * 100);

                  return (
                    <div key={idx} className="roadmap-section">
                      <h3>
                        {section.topic} ({done}/{total})
                      </h3>

                      <ul>
                        {section.questions.map((q) => (
                          <li key={q.id}>
                            <input
                              type="checkbox"
                              checked={completed[q.id] || false}
                              onChange={() => toggleComplete(q.id)}
                            />
                            <a
                              href={q.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={completed[q.id] ? "completed" : ""}
                            >
                              {q.title}
                            </a>
                          </li>
                        ))}
                      </ul>

                      {/* ✅ Progress bar */}
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default LeetCode;
