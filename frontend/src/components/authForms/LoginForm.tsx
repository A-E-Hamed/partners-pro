import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import styles from "./AuthForms.module.css";

interface LoginFormProps {
  onSwitch: () => void;
}

const LoginForm = ({ onSwitch }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      localStorage.setItem("token", response.data.token);
      console.log("Login successful:", response.data);
      navigate("/home"); 
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Box className={styles.authFormContainer}>
      <Typography className={styles.authTitle}>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={styles.authButton}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Typography className={styles.authSwitchText}>
        Don't have an account? <Button onClick={onSwitch}>Sign Up</Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;
