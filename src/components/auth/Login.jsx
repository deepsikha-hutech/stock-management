import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../images/logo.svg";
import axios from "axios";
import variable from "../../assets/variables";
import Cookies from "js-cookies";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    // console.log(formProps);
    // alert("login success");
    // navigate("/dashboard", { state: { oko: "oijikbjhikjn" } });
    try {
      const { data } = await axios.post(
        `${variable?.STOCK_MANAGEMENT_API_URL}/api/v1/auth/login`,
        { email, password }
      );

      if (data?.token) {
        Cookies.setItem("accessToken", data?.token, { expires: "7d" });
        window.location.href = "http://localhost:5173/dashboard";
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid credentials.");
    }
  }

  return (
    <div className="login-main-page">
      <div className="login-inner-container">
        <div className="login-left-bar">
          <div className="login-left-bar-1">
            <img src={logo} alt="Company Logo" className="login-left-bar-1" />
          </div>

          <br></br>
          <div className="login-left-bar-2">
            <p>
              Manage Portfolios, Optimise Investments,<br></br> & Drive
              Performance
            </p>
          </div>
        </div>

        <div className="login-right-bar">
          <h2>Login</h2>
          <form onSubmit={login}>
            <div className="login-flex-start-col input-container-1">
              <input
                autoComplete="off"
                name="email"
                required
                // autoComplete={"true"}
                placeholder="Email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>

            <div className="login-flex-start-col input-container-2">
              <input
                autoComplete="off"
                name="password"
                required
                // autoComplete={"true"}
                placeholder="Password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
            <div className="login-create-account-forgot-password">
              <div className="login-create-account">
                <a href="/signup">Create Account</a> {""}
              </div>
              <div className="login-forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
            </div>

            <button type="submit" className="login-submit-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
