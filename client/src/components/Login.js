import { useState } from "react";
import FormGroup from "./FormGroup";
import SubmitButton from "./SubmitButton";

function Login() {
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
  return (
    <div className="flex h-screen justify-center items-center bg-teal-200 dark:bg-black">
      <form className="text-center" action="/login" method="POST">
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
        <SubmitButton text="SignIn" />
      </form>
    </div>
  );
}

export default Login;
