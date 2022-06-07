import React, { useState } from "react";
import Header from "./header";
import { useLocation } from "react-router-dom";
import { API_URL } from "../Config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPassword({ setRole }) {
    const navigate = useNavigate();

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const token = new URLSearchParams(search).get('token');

    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confpassword, setConfPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (id && token) {
            if (password !== confpassword) {
                setMessage("Password not match");
                return;
            } else {

                const option = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        password: password,
                        id: id,
                        token: token
                    }),
                };
                await fetch(`${API_URL}/user/create-new-password?id=${id}&token=${token}&password=${password}`, option)
                    .then(async (response) => {
                        const res = await response.json();
                        if (res.success) {
                            toast.success(res?.msg);
                            navigate("/login")
                        }
                        else{
                            console.log(res);
                            toast.error(res?.msg);
                        }

                    })
                    .catch((e) => {
                        console.log(e);
                        toast.error(e?.msg);
                    });
            }
        }
        else {
            toast.error("Please close and open this page from email again");
        }
    }



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
                        <div className="dark-box">
                            <div className="heading-sec text-center">
                                <h2>Create New Password</h2>
                                <img
                                    src="images/services.png"
                                    alt="services-image"
                                    className="border-b"
                                />
                            </div>

                            <form>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="password"
                                        value={confpassword}
                                        onChange={(e) => setConfPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="New Password"
                                    />
                                </div>

                                {message && <h4>{message}</h4>}

                                <button
                                    type="submit"
                                    className="btn btn-more"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
