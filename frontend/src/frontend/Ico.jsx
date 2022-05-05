import React from "react";
import AOS from "aos";
import Footer from "./footer";
import Header from "./header"
export default function Ico() {
    AOS.init();
    return (
        <div>
            {/** Header */}
            <Header activeHeader={"Ico"} />
            {/** Header close */}
            <div className="header-btm">
                <img src="images/header.png"></img>
            </div>
            <div className="about-sec about-us-page ico-page">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="text-box">
                                <h1>WORLD FIRST DECENTRALIZED MARKET PLACE WITH BLOCKCHAIN INFRASTRUCTURE</h1>
                                <p>The Air-4-Life Foundation [A4LF] is a Non-Profit Cooperation envisioned by the adoption of a comprehensive approach to the protection of the Right to Life for all Humanity</p>
                                <a href="#" className="btn btn-more">Learn More</a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="timmer-box">
                                <div className="time-speed-sec">
                                    <p>Pre-sale is Live Now</p>
                                    <div className="time-speed d-flex flex-wrap align-items-center">
                                        <div className="time-fixed">
                                            <h4 className="time-top">24 <span className="text-bottom">Days</span></h4>
                                            <span className="dot-sec"> : </span>
                                        </div>
                                        <div className="time-fixed">
                                            <h4 className="time-top">12 <span className="text-bottom">Hours</span></h4>
                                            <span className="dot-sec"> : </span>
                                        </div>
                                        <div className="time-fixed">
                                            <h4 className="time-top">10 <span className="text-bottom">MINUTES</span></h4>
                                            <span className="dot-sec"> : </span>
                                        </div>
                                        <div className="time-fixed">
                                            <h4 className="time-top">00 <span className="text-bottom">SECONDS</span></h4>
                                        </div>
                                    </div>

                                    <div className="speedo-meeter">
                                        <div className="d-flex justify-content-between">
                                            <span>Sale Raised</span>
                                            <span>Soft-caps</span>
                                        </div>
                                        <div className="full-sec">
                                            <span className="white-color"></span>
                                            <span className="dark-color"></span>
                                        </div>

                                        <a href="#" className="btn btn-more">Purchase Tokens</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="services-sec about-page-services">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" data-aos-duration="2000" data-aos="fade-up">
                            <h2>Our Core Services</h2>
                            <img src="images/services.png" className="border-b" />
                        </div>
                        <div className="col-md-4">
                            <div className="services-box" data-aos-duration="2000" data-aos="fade-up">
                                <img src="images/Cryptoguys-Landing.png" />
                                <h4>Smart Trading Modules</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit Lorem ipsum.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="services-box" data-aos-duration="2000" data-aos="fade-up">
                                <img src="images/ds.png" />
                                <h4>Adaptive Social Assistant</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit Lorem ipsum.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="services-box" data-aos-duration="2000" data-aos="fade-up">
                                <img src="images/d.png" />
                                <h4>Analyzer of the News</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit Lorem ipsum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/** footer  */}
            <Footer />
            {/** footer end */}

        </div >
    );
}