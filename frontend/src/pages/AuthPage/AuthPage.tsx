import { useState } from "react";
import { Box } from "@mui/material";
import LoginForm from "../../components/authForms/LoginForm";
import SignupForm from "../../components/authForms/SignupForm";
import styles from "./AuthPage.module.css";
import authLogo from "../../assets/auth-logo.jpg"; 

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box className={styles.authContainer}>
      <Box className={styles.authPaper}>
        {/* Form Section */}
        <Box className={styles.authFormContainer}>
          {isLogin ? (
            <LoginForm onSwitch={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitch={() => setIsLogin(true)} />
          )}
        </Box>

        {/* Image Section */}
        <Box className={styles.authImageContainer}>
          <img src={authLogo} alt="Auth Logo" className={styles.authImage} />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
