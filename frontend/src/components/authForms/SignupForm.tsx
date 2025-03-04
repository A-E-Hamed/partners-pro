import { useState } from "react";
import axios from "axios"; // Import Axios for API calls
import { TextField, Button, Box, Typography } from "@mui/material";
import styles from "./AuthForms.module.css";

interface SignupFormProps {
  onSwitch: () => void;
}

const SignupForm = ({ onSwitch }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage(""); // Clear any previous message
  };

  const handleSubmit = async () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "" };

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
      valid = false;
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include one letter, one number, and one special character.";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const BASE_URL = "http://localhost:5000/api";
      const response = await axios.post(`${BASE_URL}/users/register`, formData);

      setMessage("Signup successful! Redirecting...");
      console.log("Signup Response:", response.data);

      setTimeout(() => {
        onSwitch(); // Switch to login form after signup
      }, 2000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <Box className={styles.authFormContainer}>
      <Typography className={styles.authTitle}>Sign Up</Typography>

      {message && (
        <Typography
          className={
            message.includes("successful")
              ? styles.successMessage
              : styles.errorMessage
          }
        >
          {message}
        </Typography>
      )}

      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={styles.authButton}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>

      <Typography className={styles.authSwitchText}>
        Already have an account? <Button onClick={onSwitch}>Login</Button>
      </Typography>
    </Box>
  );
};

export default SignupForm;
