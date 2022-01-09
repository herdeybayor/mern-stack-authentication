import { useState } from "react";
import FormGroup from "./FormGroup";
import SubmitButton from "./SubmitButton";
function Register() {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    username: "",
    password: "",
    cpassword: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prevValue) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName,
          username: prevValue.username,
          password: prevValue.password,
          cpassword: prevValue.cpassword,
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value,
          username: prevValue.username,
          password: prevValue.password,
          cpassword: prevValue.cpassword,
        };
      } else if (name === "username") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          username: value,
          password: prevValue.password,
          cpassword: prevValue.cpassword,
        };
      } else if (name === "password") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          username: prevValue.username,
          password: value,
          cpassword: prevValue.cpassword,
        };
      } else if (name === "cpassword") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          username: prevValue.username,
          password: prevValue.password,
          cpassword: value,
        };
      }
    });
  }
  return (
    <div className="flex h-screen justify-center items-center bg-teal-200 dark:bg-black px-8">
      <form className="text-center" action="/register" method="POST">
        <FormGroup
          change={(e) => {
            handleChange(e);
          }}
          value={formData.fName}
          inputType="text"
          name="fName"
          label="First Name"
        />
        <FormGroup
          change={(e) => {
            handleChange(e);
          }}
          value={formData.lName}
          inputType="text"
          name="lName"
          label="Last Name"
        />
        <FormGroup
          change={(e) => {
            handleChange(e);
          }}
          value={formData.username}
          inputType="email"
          name="username"
          label="Email Address"
        />
        <FormGroup
          change={(e) => {
            handleChange(e);
          }}
          value={formData.password}
          inputType="password"
          name="password"
          label="Password"
        />
        <FormGroup
          change={(e) => {
            handleChange(e);
          }}
          value={formData.cpassword}
          inputType="password"
          name="cpassword"
          label="Confirm Password"
        />
        <SubmitButton text="Register" />
      </form>
    </div>
  );
}

export default Register;
