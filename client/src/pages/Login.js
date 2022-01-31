import Axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormGroup from "../components/FormGroup";
import SubmitButton from "../components/SubmitButton";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

function Login() {
  let navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prevValue) => {
      if (name === "username") {
        return {
          username: value,
          password: prevValue.password,
        };
      } else {
        return {
          username: prevValue.username,
          password: value,
        };
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    Axios({
      method: "POST",
      data: formData,
      withCredentials: true,
      url: "http://localhost:3001/login",
    })
      .then((res) => {
        if (res.data.msg === "Successfully Logged In!") {
          setIsLoggedIn(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          toast.success(res.data.msg);
          navigate("/profile", { replace: true });
        } else {
          setIsLoggedIn(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Incorrect Password!");
        console.log(err);
      });
  }
  return (
    <div className="flex h-screen justify-center items-center bg-teal-200 dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="text-center"
        action="/login"
        method="POST"
      >
        <FormGroup
          change={(e) => {
            handleChange(e);
          }}
          value={formData.username}
          inputType="email"
          label="Email Address"
          name="username"
        />
        <FormGroup
          change={(e) => {
            handleChange(e);
          }}
          value={formData.password}
          inputType="password"
          label="Password"
          name="password"
        />
        <SubmitButton text="Sign In" />
      </form>
    </div>
  );
}

export default Login;
