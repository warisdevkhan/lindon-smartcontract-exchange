import React, { useState, useEffect } from "react";
import Header from "./header";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../Config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPassword({ setRole }) {

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const token = new URLSearchParams(search).get('token');

    const [message, setmessage] = useState("");

    const verifyEmail = async () => {
        if (id && token) {
            const option = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/user/verify-email?id=${id}&token=${token}`, option)
                .then(async (response) => {
                    const res = await response.json();
                    console.log("res", res);
                    setmessage(res?.msg)
                })
                .catch((e) => {
                    console.log(e);
                    setmessage(e?.msg)
                    toast.error(e?.msg);
                });
        }
        else {
            toast.error("Invalid Credentials");
            setmessage("Invalid Credentials")
        }
    }


    useEffect(() => {
        verifyEmail()
    }, []);


    return (
        <div>
            <Header activeHeader={""} />
            <div className="header-btm">
                <img src="images/header.png" alt="header-image"></img>
            </div>
            <div className="login-sec2">
                <div className="cust-container cust-container-login">
                    <div className="inner-login-sec">
                        {/* <a href="#" className="logo"><img src="images/Logo.png" /></a> */}
                        <h2>{message}</h2>
                        {(message === "Email activated successfully" || message === "Email already activated") && <Link to="/login">Login Now</Link>}
                    </div>
                </div>
            </div>
        </div>
    );
}
