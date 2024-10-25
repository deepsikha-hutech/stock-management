import React, { useState } from "react";
import "./resetPassword.css";

import logo from "../images/logo.svg";

function ResetPassword() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [person, setPerson] = useState([]);

  const handleSubmit = (e) => {
    console.log(
      "a link to reset your password has been sent to you on:",
      email
    );
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
          <h2> Reset Password</h2>
          <p>
            Enter your registration email to receive a link to reset your
            password
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex-start-col input-container-1">
              <input
                placeholder="Email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
            <button type="submit" className="submit-button">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
