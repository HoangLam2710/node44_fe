import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAPI, resetPasswordAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const sendEmail = () => {
    forgotPasswordAPI({ email })
      .then((result) => {
        toast.success(result.message);
        setStep(1);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const resetPassword = () => {
    const code = document.getElementById("code").value;
    const newPass = document.getElementById("pass").value;

    resetPasswordAPI({ email, code, newPass })
      .then((result) => {
        toast.success(result.message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        {step === 0 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị state khi người dùng nhập email
              />
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={sendEmail}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 1 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Nhập CODE
              </label>
              <input className="form-control" id="code" />
              <label htmlFor="inputEmail4" className="form-label">
                Đổi mật khẩu
              </label>
              <input className="form-control" id="pass" />
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={resetPassword}
              >
                Next
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
