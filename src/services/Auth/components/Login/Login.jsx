import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../userSlice";
import LoginForm from "../LoginForm/LoginForm";

Login.propTypes = {};

function Login(props) {
  const dispatch = useDispatch();

  const handleFormSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      //show something after request sucessful
      console.log("Log in success");
    } catch (error) {
      console.log("Failed to register", error);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default Login;
