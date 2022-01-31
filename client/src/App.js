import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { UserContext } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.user === undefined
      ? { loggedIn: false }
      : JSON.parse(localStorage.user)
  );
  const [theme, setTheme] = useState(
    localStorage.user === undefined ? "light" : localStorage.theme
  );
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Navbar />
          <ToastContainer theme={theme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
