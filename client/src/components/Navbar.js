import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginIcon,
  HomeIcon,
  DatabaseIcon,
  LightBulbIcon,
  MoonIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import Axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeContext";
function Navbar() {
  let navigate = useNavigate();
  const [navbarVisibility, setNavbarVisibility] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
    return () => {
      root.classList.remove(theme);
    };
  }, [theme, colorTheme]);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  function handleLogout(e) {
    e.preventDefault();
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:3001/logout",
    })
      .then((res) => {
        setIsLoggedIn(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success(res.data.msg);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <nav className="bg-white flex items-center justify-between fixed top-0 left-0 w-full py-4 shadow z-30">
      <div>
        <Link
          to="/"
          className="font-bold ml-8 text-xl text-teal-700 dark:text-black"
        >
          MERN AUTH
        </Link>
      </div>

      <div className="hidden md:flex mr-8">
        {isLoggedIn.loggedIn ? (
          <Link
            onClick={handleLogout}
            to="/logout"
            className="flex items-center bg-teal-700 dark:bg-black text-teal-200 dark:text-white px-5 py-2 rounded-md odd:mr-6 hover:bg-teal-900 dark:hover:bg-gray-800"
          >
            <LogoutIcon className="h-5 w-5" />
            <p>Logout</p>
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center bg-teal-700 dark:bg-black text-teal-200 dark:text-white px-5 py-2 rounded-md odd:mr-6 hover:bg-teal-900 dark:hover:bg-gray-800"
            >
              <LoginIcon className="h-5 w-5" />
              <p>Login</p>
            </Link>
            <Link
              to="/register"
              className="flex items-center  bg-teal-700 dark:bg-black text-teal-200 dark:text-white px-5 py-2 rounded-md odd:mr-6 hover:bg-teal-900 dark:hover:bg-gray-800"
            >
              <DatabaseIcon className="h-5 w-5" />
              <p>Register</p>
            </Link>
          </>
        )}

        <span
          onClick={() => {
            setTheme(colorTheme);
          }}
          className="h-10 w-10 p-2 ml-6 text-teal-200 dark:text-white bg-teal-700 dark:bg-black hover:bg-teal-900 dark:hover:bg-gray-800 rounded-full cursor-pointer"
        >
          {colorTheme === "light" ? <LightBulbIcon /> : <MoonIcon />}
        </span>
      </div>

      <button
        className="block md:hidden mr-8 shadow p-3"
        onClick={() => {
          setNavbarVisibility(true);
        }}
      >
        <div className="bg-gray-500 h-1 w-6 mb-1"></div>
        <div className="bg-gray-500 h-1 w-6 mb-1"></div>
        <div className="bg-gray-500 h-1 w-6"></div>
      </button>

      <div
        className={
          navbarVisibility
            ? "flex flex-col py-16 px-8 md:hidden h-screen w-9/12 bg-white shadow fixed top-0 right-0 translate-x-0 transition-all duration-500 ease-in"
            : "flex flex-col py-16 px-8 md:hidden h-screen w-9/12 bg-white shadow fixed top-0 right-0 translate-x-full transition-all duration-500 ease-in"
        }
      >
        <span
          onClick={() => {
            setTheme(colorTheme);
          }}
          className="h-10 w-10 p-2 ml-6 text-teal-200 dark:text-white bg-teal-700 dark:bg-black hover:bg-teal-900 dark:hover:bg-gray-800 rounded-full cursor-pointer absolute top-5 right-5"
        >
          {colorTheme === "light" ? <LightBulbIcon /> : <MoonIcon />}
        </span>
        <Link
          to="/"
          className="flex items-center border-b-2 border-teal-400 dark:border-black py-4 text-teal-700 dark:text-black"
          onClick={() => {
            setNavbarVisibility(false);
          }}
        >
          <HomeIcon className="h-5 w-5" />
          <p className="text-xl font-medium">Home</p>
        </Link>
        {isLoggedIn.loggedIn ? (
          <Link
            onClick={(e) => {
              handleLogout(e);
              setNavbarVisibility(false);
            }}
            to="/logout"
            className="flex items-center py-4 text-teal-700 dark:text-black"
          >
            <LogoutIcon className="h-5 w-5" />
            <p className="text-xl font-medium">Logout</p>
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center border-b-2 border-teal-400 dark:border-black py-4 text-teal-700 dark:text-black"
              onClick={() => {
                setNavbarVisibility(false);
              }}
            >
              <LoginIcon className="h-5 w-5" />
              <p className="text-xl font-medium">Login</p>
            </Link>
            <Link
              to="/register"
              className="flex items-center py-4 text-teal-700 dark:text-black"
              onClick={() => {
                setNavbarVisibility(false);
              }}
            >
              <DatabaseIcon className="h-5 w-5" />
              <p className="text-xl font-medium">Register</p>
            </Link>
          </>
        )}
      </div>
      <div
        className={
          navbarVisibility
            ? "block md:hidden h-screen bg-black opacity-20 absolute top-0 left-0 w-3/12 shadow translate-x-0 transition-all duration-500 ease-in"
            : "block md:hidden h-screen bg-black opacity-0 absolute top-0 left-0 w-3/12 shadow -translate-x-full transition-all duration-500 ease-in"
        }
        onClick={() => {
          setNavbarVisibility(false);
        }}
      ></div>
    </nav>
  );
}

export default Navbar;
