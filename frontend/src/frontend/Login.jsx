import React, { useState, useEffect } from "react";
import Header from "./header";
import { Link } from "react-router-dom";
import { API_URL } from "../Config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ setRole }) {
  let history = useNavigate();
  let isLogin = localStorage.getItem("isLogin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLogin === "true") {
      history("/dashboard");
    }
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function handleLogin(event) {
    event.preventDefault();
    if (!email) {
      toast.warn("Please Enter email");
    } else if (!validateEmail(email)) {
      toast.warn("Please Enter valid email");
    } else if (!password) {
      toast.warn("Please Enter Password");
    } else {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      await fetch(`${API_URL}/user/login`, option)
        .then(async (response) => {
          const res = await response.json();
          if (res.success === true) {
            console.log(res);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userToken", res.accessToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", res.role);
            setRole(res.role);
            history("/dashboard");
            toast.success("Login Success");
          } else {
            console.log(res);
            toast.error(res?.msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  return (
    <div>
      <Header activeHeader={"Login"} />
      <div className="header-btm">
        <img src="images/header.png" alt="header-image"></img>
      </div>
      <div className="login-sec2">
        <div className="cust-container cust-container-login">
          <div className="inner-login-sec">
            {/* <a href="#" className="logo"><img src="images/Logo.png" /></a> */}
            <div className="dark-box">
              <div className="heading-sec text-center">
                <h2>Login</h2>
                <img
                  src="images/services.png"
                  alt="services-image"
                  className="border-b"
                />
              </div>

              <form>
                <div className="form-group">
                  <input
                    type="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-more"
                  onClick={handleLogin}
                >
                  Submit
                </button>
                <p>
                  Don't Have An Account?{" "}
                  <Link to="/register">Registration Now</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
