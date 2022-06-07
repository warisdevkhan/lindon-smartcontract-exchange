import React, { useState, useEffect } from "react";
import Header from "./header";
import { API_URL } from "../Config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  let history = useNavigate();

  let isLogin = localStorage.getItem("isLogin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  async function handleRegister(event) {
    event.preventDefault();
    if (!email) {
      toast.warn("Please Enter email");
    } else if (!validateEmail(email)) {
      toast.warn("Please Enter valid email");
    } else if (!password) {
      toast.warn("Please Enter Password");
    }else if (password.length < 8) {
      toast.warn("Password Must Contains 8 Characters");
    }
    else if (!confirmPassword) {
        toast.warn("Please Enter Confirm Password");
    }
     else if (password !== confirmPassword) {
      toast.warn("Passwords Are Not Same");
    } else {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirm_password: password,
        }),
      };
      await fetch(`${API_URL}/user/signup`, option)
        .then(async (response) => {
          const res = await response.json();
          if (res.success === true) {
            toast.success(res?.msg);
            toast.success("Please Check Your Email To Activate Your Account" ,{autoClose: 5000})
            // history("/login");
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
      <Header activeHeader={"Register"} />
      <div className="header-btm">
        <img src="images/header.png"></img>
      </div>
      <div className="login-sec2">
        <div className="cust-container cust-container-login">
          <div className="inner-login-sec">
            {/* <a href="#" className="logo"><img src="images/Logo.png" /></a> */}
            <div className="dark-box">
              <div className="heading-sec text-center">
                <h2>Registration</h2>
                <img src="images/services.png" className="border-b" />
              </div>
              <form>
                <div className="form-group">
                  <input
                    type="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="Password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-more"
                  onClick={handleRegister}
                >
                  Submit
                </button>
                <p>
                  Already Have An Account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
