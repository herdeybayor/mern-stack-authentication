import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Register from "./Register";
import { UserContext } from "./UserContext";

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
