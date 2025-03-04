import { useEffect, useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4">
            Welcome, {userName ? userName : "Guest"}!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "3rem" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      )}
    </div>
  );
};

export default HomePage;
