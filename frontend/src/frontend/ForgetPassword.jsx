import React, { useState, useEffect } from "react";
import Header from "./header";
import { Link } from "react-router-dom";
import { API_URL } from "../Config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function ForgetPassword({ setRole }) {
  let history = useNavigate();

  const [email, setEmail] = useState("");

  useEffect(() => {}, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function handleForget(event) {
    event.preventDefault();
    if (!email) {
      toast.warn("Please Enter email");
    } else if (!validateEmail(email)) {
      toast.warn("Please Enter valid email");
    } else {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      };
      await fetch(`${API_URL}/user/forget-password`, option)
        .then(async (response) => {
          const res = await response.json();
          if (res.success === true) {
            toast.success(
              "Check Email To Generate New Password !!!"
            );
          } else {
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
      <Header activeHeader={"forget"} />
      <div className="header-btm">
        <img src="images/header.png" alt="header-image"></img>
      </div>
      <div className="login-sec2">
        <div className="cust-container cust-container-login">
          <div className="inner-login-sec">
            {/* <a href="#" className="logo"><img src="images/Logo.png" /></a> */}
            <div className="dark-box">
              <div className="heading-sec text-center">
                <h2>Enter Email</h2>
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

                <button
                  type="submit"
                  className="btn btn-more"
                  onClick={handleForget}
                >
                  Submit
                </button>
                <p>
                  <Link to="/login">
                    <KeyboardBackspaceIcon />
                    Back To Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
