import React from "react";
import Header from "./header";
import { Link } from "react-router-dom";
import { API_URL } from "../Config";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    let history = useNavigate();
    async function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        document.getElementById("error").innerHTML = ""
        if (email == "" || password == "")
            document.getElementById("error").innerHTML = "please fill all fields"
        else {
            const option = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                })
            }
            await fetch(`${API_URL}/user/login`, option)
                .then(async (response) => {
                    const res = await response.json();
                    if (res.success) {
                        console.log(res)
                        localStorage.setItem("userEmail", email)
                        localStorage.setItem("userToken", res.accessToken)
                        history("/dashboard")
                    } else {
                        console.log(res)
                        if (res.errors[0].msg)
                            document.getElementById("error").innerHTML = res.errors[0].msg
                        else if (res.errors[1].msg)
                            document.getElementById("error").innerHTML = res.errors[1].msg
                        else if (res.errors[2].msg)
                            document.getElementById("error").innerHTML = res.errors[2].msg
                    }
                }).catch((e) => {
                    console.log(e)
                })

        }
    }
    return (
        <div>
            <Header activeHeader={"Login"} />
            <div className="header-btm">
                <img src="images/header.png"></img>
            </div>
            <div className="login-sec">
                <div className="cust-container">
                    <div className="inner-login-sec">
                        <a href="#" className="logo"><img src="images/Logo.png" /></a>

                        <div className="dark-box">
                            <div className="heading-sec text-center">
                                <h2>Login</h2>
                                <img src="images/services.png" className="border-b" />
                            </div>

                            <form>
                                <div className="form-group">
                                    <input type="Email" className="form-control" id="email" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input type="Password" className="form-control" id="password" placeholder="Password" />
                                    <br /><span id="error" style={{ color: "red" }}></span>
                                </div>
                                <button type="submit" className="btn btn-more" onClick={handleLogin}>Submit</button>
                                <p>Don't Have An Account? <a href="/register">Registration Now</a></p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}