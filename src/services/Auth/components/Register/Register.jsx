import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import RegisterForm from "../RegisterForm/RegisterForm";

Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();

  const handleFormSubmit = async (values) => {
    console.log("Form submit: ", values);

    try {
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      //show something after request sucessful
      console.log("New user:", user);
    } catch (error) {
      console.log("Failed to register", error);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default Register;
