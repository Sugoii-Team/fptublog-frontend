import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../userSlice";
import GoogleLogin from "react-google-login";

MyGoogleLogin.propTypes = {};

function MyGoogleLogin(props) {
  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    /*   console.log(response);
    console.log(response.profileObj); */

    var token = "id_token=" + response.tokenId;
    try {
      const action = login(token);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      //show something after request sucessful
      console.log("Log in success");
    } catch (error) {
      console.log("Failed to Login", error);
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId="412413988682-r9de2fogj5hfnsd72vh5eqqdpsjhc1jo.apps.googleusercontent.com"
        buttonText="Login with @fpt.edu.vn"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default MyGoogleLogin;
