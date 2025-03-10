import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
