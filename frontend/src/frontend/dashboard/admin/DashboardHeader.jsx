import React, { useState ,useEffect } from "react";
import Logo from "./assets/images/logo.png"
import UserImg from "./assets/images/user-img.png"
import "./assets/css/admin.css";
import { API_URL } from "../../../Config";
import { useNavigate ,useLocation, Link } from 'react-router-dom';
import { toast } from "react-toastify";


export default function DashboardHeader() {
    let history = useNavigate();
    let location = useLocation();

    let HeaderName = location?.state?.name

    useEffect(() => {
        if (localStorage.getItem("isLogin") !== "true"){ 
            history("/login")
        }
    }, [])

    const [toggle, setToggle] = useState(false);
    function handleToggle() {
        if (!toggle) {
            document.body.classList.remove('menu-close');
            document.body.classList.add('menu-open');
        }
        else {
            document.body.classList.remove("menu-open")
            document.body.classList.add('menu-close');
        }
        setToggle(!toggle)
    }

    async function handleLogout() {
        const option = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem("userToken")
            }

        }
        await fetch(`${API_URL}/user/logout`, option)
            .then(async (response) => {
                const res = await response.json();
                if (res.success) {
                    localStorage.removeItem("userEmail")
                    localStorage.removeItem("userToken")
                    localStorage.clear()
                    history("/login")
                    toast.success("Logout Success !!!");
                }
            })
    }
    return (
        <header className="navbar theme-header">
            <div className="head-logo">
                <Link to={'/dashboard'} state={{name: "Dashboard"}} className="logo"><img src={Logo} alt="LOGO" /></Link>
                <button className="closeMenu_btn"><span className="toggle_icon"></span></button>
            </div>
            <div className="top-navs d-flex align-items-center">
                <button className="btn_toggle" id="btn_toggle" onClick={() => handleToggle(toggle)}><span className="toggle_icon"></span></button>
                <div className="dash-head-blk">
                    <h3>{HeaderName}</h3>
                </div>
                <div className="top-right ml-auto d-flex align-items-center">
                    <div className="header-setting d-flex align-items-center">
                        <div className="user-links">
                            <a href="#">
                                <i className="fa fa-bell"></i>
                            </a>
                        </div>
                    </div>
                    <div className="user-profile dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="userMenuprofile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="user_icon">
                                <img src={UserImg} alt="" />
                            </span>
                            <span className="admin-name">{localStorage.getItem("userEmail")} <i className="fa fa-angle-down"></i></span>
                        </a>
                        <ul className="user-prof-menu dropdown-menu">
                            {/* <li><a href="#"><i className="fa fa-user" aria-hidden="true"></i> My Profile</a></li>
                            <li><a href="#"><i className="fa fa-sliders slider-fa" aria-hidden="true"></i> Account Setting</a></li>
                            <li><a href="#"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Order History</a></li> */}
                            <li><a href="#" onClick={handleLogout}><i className="fa fa-sign-in sign-fa" aria-hidden="true" ></i> Log Out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>

    );
}