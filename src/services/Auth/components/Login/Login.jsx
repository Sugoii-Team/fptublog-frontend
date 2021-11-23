import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../adminSlice";
import LoginForm from "../LoginForm/LoginForm";
import PropTypes from 'prop-types';

Login.propTypes = {
  onCancelClick: PropTypes.func,
};

function Login({onCancelClick}) {
  const dispatch = useDispatch();

  const handleFormSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      //show something after request sucessful
      window.alert("Login successfully");
      window.location.reload();
    } catch (error) {
      console.log("Failed to register", error);
    }
  };

  const handleCancleClick = (values) => {
    onCancelClick(values);
  }

  return (
    <div>
      <LoginForm onSubmit={handleFormSubmit} onCancelClick={handleCancleClick}/>
    </div>
  );
}

export default Login;
