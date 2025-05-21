import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log("Fetching user data...");
        setLoading(true);

        const response = await axios.get(
          "http://localhost:3001/api/auth/get-user",
          {
            withCredentials: true,
          }
        );

        console.log("API Response:", response.data);

        // Check if the response has the user data directly
        if (response.data && response.data.success === true) {
          // The response has user data directly in the user property
          setUser(response.data.user);
          console.log("User data set:", response.data.user);
        } else {
          // Handle unexpected response format
          console.error("Unexpected API response format:", response.data);
          setError("Received unexpected data format from server");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(
          "Failed to fetch user data: " + (err.message || "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  // Debug render to check component state
  console.log("Render state:", { user, loading, error });

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data found. Please log in again.</div>;
  }

  // Safely access user properties with fallbacks
  return (
    <div>
      <h1>User data</h1>

      <p>Name: {user.name || "N/A"}</p>
      <p>Email: {user.email || "N/A"}</p>
      <p>Phone: {user.phoneNumber || "N/A"}</p>
      <p>Avatar: {user.avatar ? "Available" : "N/A"}</p>
    </div>
  );
};

export default Dashboard;
