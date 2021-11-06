import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout, register } from "../../userSlice";
import GoogleLogin from "react-google-login";
import MyDialog from "../../../../components/Dialog/MyDialog";

MyGoogleLogin.propTypes = {};

function MyGoogleLogin(props) {
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const responseGoogle = async (response) => {
    /*   console.log(response);
    console.log(response.profileObj); */
    var token = "id_token=" + response.tokenId;
    try {
      const action = login(token);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      // console.log(resultAction.payload.headers.authorization)
      //Set timeout to logout
      const minute = 30;
      setTimeout(() => {
        dispatch(logout());
      }, minute * 1000 * 60);
      //show something after request sucessful
      console.log("Log in success");
    } catch (error) {
      /* If account not existed then register */
      if (error.message === "Account is not existed") {
        const action = register(token);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        const minute = 30;
        setTimeout(() => {
          dispatch(logout());
        }, minute * 1000 * 60);
      }
      console.log("Failed to Login: ", error.message);
    }
  };

  const handleCloseDialog = (isCancel) => {
    if (isCancel) {
      setDialog(false);
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
      {dialog ? (
        <MyDialog
          isCancel={handleCloseDialog}
          title="FPTU Blog"
          description="Your Session is timedout please login again!"
        />
      ) : null}
    </div>
  );
}

export default MyGoogleLogin;
