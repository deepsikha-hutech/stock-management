import React, { useState } from "react";
import "./Signup.css";
import logo from "../images/logo.svg";

function Signup() {
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [person, setPerson] = useState([]);

  const handleSubmit = (e) => {
    console.log("Login data:", loginData);
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
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex-start-col input-container-3">
              <input
                placeholder="Name"
                type="name"
                value={loginData.name}
                onChange={(e) =>
                  setLoginData({ ...loginData, name: e.target.value })
                }
              />
            </div>

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

            <div className="flex-start-col input-container-2">
              <input
                placeholder="Password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>

            <div className="login">
              Already have an account? <a href="/login">Login</a>
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Signup;
