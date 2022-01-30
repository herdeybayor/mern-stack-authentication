import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.user === undefined
      ? { loggedIn: false }
      : JSON.parse(localStorage.user)
  );
  /* const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("user"))
  ); */
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
