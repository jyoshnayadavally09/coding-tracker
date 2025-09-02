import { useEffect, useState } from "react";

function Codecheff() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Change this to the username you want to track
  const username = "your_codechef_id";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/codechef/${username}`);
        if (!res.ok) throw new Error("Failed to fetch CodeChef data");

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <p>Loading CodeChef stats...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div className="codechef-card" style={styles.card}>
      <h2 style={styles.heading}>👨‍💻 CodeChef Profile</h2>
      <p><strong>Username:</strong> {data.username}</p>
      <p><strong>Rating:</strong> {data.rating}</p>
      <p><strong>Stars:</strong> {data.stars}</p>
      <p><strong>Global Rank:</strong> {data.globalRank}</p>
      <p><strong>Country Rank:</strong> {data.countryRank}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "15px",
    fontSize: "1.5rem",
    color: "#333",
  }
};

export default Codecheff;
