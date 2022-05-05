import React, { useEffect } from "react";
import AOS from "aos";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import QRCode from "./assets/images/qrcode.png";

export default function Wallet() {
    useEffect(() => {
        document.title = "Admin :: Dashboard"
        document.body.classList.add('menu-open');
    }, [])
    return (
        <div className="main-wrap">
            <DashboardHeader />
            <div className="dashboard-wraper">
                <Sidebar active={"wallet"} />
                <div className="content-wrap">
                    <div className="dashboard-content p">
                        <div className="dash-body-blk">
                            <div className="dash-report-blk px-xl-4 px-2 pt-2">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="wallet-sec">
                                            <div className="text-center h2 text-warning">Coming soon...</div>
                                            {/* <div className="inner-wallet-box"> */}
                                            {/* <img src={QRCode} /> */}
                                            {/* <div className="wallet-box">
                                                    <h1>wallet balance</h1>
                                                    <h2>455.00</h2>
                                                    <ul className="d-flex align-items-center justify-content-center">
                                                        <li><a href="#" className="border-btn">Buy</a></li>
                                                        <li><a href="#" className="border-btn" data-toggle="modal" data-target="#exampleModalCenter">Send</a></li>
                                                    </ul>
                                                    <div className="btm-wallet">
                                                        <p>Your Wallet Address</p>
                                                        <span className="barcode">AKSYEGD72KO92NC6J4G68KK</span>
                                                        <a href="#" className="btn btn-full">Copy</a>
                                                    </div>
                                                </div> */}
                                            {/* </div> */}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <footer className="text-center">
                                            <p>&copy; Lindon ICO, 2021</p>
                                        </footer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}