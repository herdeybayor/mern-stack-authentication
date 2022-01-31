import { DatabaseIcon, LoginIcon } from "@heroicons/react/outline";
import Axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
function Home() {
  const { setIsLoggedIn } = useContext(UserContext);
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/user",
    })
      .then((res) => {
        setIsLoggedIn(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setIsLoggedIn]);
  return (
    <div className="flex h-screen justify-center items-center flex-col bg-teal-200 text-center dark:bg-black transition duration-500">
      <h1 className="text-teal-700 dark:text-white font-bold text-4xl">
        MERN STACK AUTHENTICATION
      </h1>
      <p className="text-teal-700 dark:text-white text-xl font-medium my-4">
        Follow the links below to proceed...
      </p>
      <div className="my-4 flex">
        <Link
          to="/login"
          className="flex items-center  bg-teal-700 dark:bg-white text-teal-200 dark:text-black px-5 py-2 rounded-md odd:mr-6 hover:bg-teal-900 dark:hover:bg-gray-300"
        >
          <LoginIcon className="h-5 w-5" />
          <p>Login</p>
        </Link>
        <Link
          to="/register"
          className="flex items-center  bg-teal-700 dark:bg-white text-teal-200 dark:text-black px-5 py-2 rounded-md odd:mr-6 hover:bg-teal-900 dark:hover:bg-gray-300"
        >
          <DatabaseIcon className="h-5 w-5" />
          <p>Register</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
