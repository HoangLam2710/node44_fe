import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import { toast } from "react-toastify";
import ReactFacebookLogin from "react-facebook-login";

import { Videos, ChannelCard } from ".";
import {
  loginAPI,
  loginAsyncKeyAPI,
  loginFacebookAPI,
} from "../utils/fetchFromAPI";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleLogin = () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    loginAsyncKeyAPI({ email, pass })
      .then((result) => {
        toast.success(result.message);
        localStorage.setItem("LOGIN_USER", result.data);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    // loginAPI({ email, pass })
    //   .then((result) => {
    //     toast.success(result.message);
    //     localStorage.setItem("LOGIN_USER", result.data);
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message);
    //   });
  };

  const handleLoginFacebook = (response) => {
    const { id, name, email } = response;
    loginFacebookAPI({ id, name, email })
      .then((result) => {
        toast.success(result.message);
        localStorage.setItem("LOGIN_USER", result.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>

          <div className="col-md-12 d-flex justify-content-end">
            <Link to="/forgot-password" className="text-primary">
              Forgot Password
            </Link>
          </div>

          <div className="col-12">
            <button
              onClick={handleLogin}
              type="button"
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
          <ReactFacebookLogin
            appId="1286219099208249"
            fields="name,email,picture"
            callback={async (response) => await handleLoginFacebook(response)}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
