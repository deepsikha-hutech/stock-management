import React, { useState } from "react";
import "./forgotPassword.css";
import logo from "../images/logo.svg";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [person, setPerson] = useState([]);
  const navigate = useNavigate();

  const ForgotPassword = () => {};

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="main-page">
      <div className="inner-container">
        <div className="left-bar">
          <div className="left-bar-1">
            <img src={logo} alt="Company Logo" className="left-bar-1" />
          </div>

          <br></br>
          <div className="left-bar-2">
            <p>
              Manage Portfolios, Optimise Investments,<br></br> & Drive
              Performance
            </p>
          </div>
        </div>

        <div className="right-bar">
          <h2>Check Your Mail</h2>
          <p>
            a link to reset your password has been sent to you on
            username@gmail.com
          </p>
          {/* <button onClick={() => navigate("/login")}>Return to Login</button> */}
          <button
            onClick={navigateToLogin}
            type="submit"
            className="submit-button"
          >
            Return to Login
          </button>
          <div className="last-line">
            <p>
              Didn't receive the mail?
              <span className="timer">00:59</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
