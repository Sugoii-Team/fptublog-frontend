import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout, register } from "../../userSlice";
import GoogleLogin from "react-google-login";
import MyDialog from "../../../../components/Dialog/MyDialog";
import userApi from "../../../userApi";

MyGoogleLogin.propTypes = {};

function MyGoogleLogin(props) {
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const responseGoogle = async (response) => {
    var token = "id_token=" + response.tokenId;
    try {
      const action = login(token);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      // console.log(resultAction.payload.headers.authorization)
      const response = unwrapResult(resultAction);
      //Set timeout to logout
      const minute = 30;
      setTimeout(() => {
        dispatch(logout());
      }, minute * 1000 * 60);
      //show something after request sucessful
      if (response.status === 200) {
        alert("Loggin success!");
        window.location.reload();
      }
    } catch (error) {
      /* If account not existed then register */
      if (error.message === "Account is not existed") {
        const action = register(token);
        const resultAction = await dispatch(action);
        const response = unwrapResult(resultAction);
        const minute = 30;
        setTimeout(() => {
          dispatch(logout());
        }, minute * 1000 * 60);

        if (response.status === 200) {
          alert("Loggin success!");
          window.location.reload();
        }
      } else if (
        error.message.includes("Request failed with status code 401")
      ) {
        //If user got banned then call api to get ban's message
        //Cut message string to get data
        const userId = error.message.replace(
          "Error: Request failed with status code 401 ",
          ""
        );
        //Call api to get message
        try {
          const banMessageResponse = await userApi.getBanMessage(userId.trim());
          alert(
            "You has been banned! \nReason: " + banMessageResponse.data.message
          );
        } catch (error) {
          console.log("Failed to get message: ", error);
        }
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
