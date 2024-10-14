import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import { toast } from "react-toastify";
import QRCode from "qrcode";

import { Videos, ChannelCard } from ".";
import { registerAPI } from "../utils/fetchFromAPI";

const SignUp = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const [isQrScanned, setIsQrScanned] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleRegister = () => {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    registerAPI({ fullName, email, pass })
      .then((result) => {
        const secret = result.data.secret;
        const otpauth = `otpauth://totp/${email}?secret=${secret}&issuer=Node44`;
        QRCode.toDataURL(otpauth)
          .then((qrCodeUrl) => {
            setQrCode(qrCodeUrl);
            toast.success(result.message);
          })
          .catch((err) => {});

        // toast.success(result.message);
        // navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  const handleQrScanConfirmation = () => {
    setIsQrScanned(true);
    navigate("/login");
  };

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          {/* fullName */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Full name
            </label>
            <input className="form-control" id="fullName" />
          </div>

          {/* email */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          {/* pass */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>

          {/* button */}
          <div className="col-12">
            <button
              onClick={handleRegister}
              type="button"
              className="btn btn-primary"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      {qrCode && (
        <div className="text-center mt-4">
          <h4>Scan the QR Code with Google Authenticator</h4>
          <img src={qrCode} alt="QR Code" />
          <button
            onClick={handleQrScanConfirmation}
            type="button"
            className="btn btn-success mt-3"
          >
            I've Scanned the QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
