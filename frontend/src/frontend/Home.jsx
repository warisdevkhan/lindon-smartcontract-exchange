import React from "react";
import Footer from "./footer";
import Header from "./header";
import AOS from "aos";
export default function Home() {
    AOS.init();
    function learnMore() {
        document.getElementById("learn-btn").style.display = "none"
        document.getElementById("next-part").style.display = "block"
    }
    return (
        <div>
            <div id="particles-js" />
            {/* header */}
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <a className="navbar-brand p-0" href="#"><img src="images/Logo.png" /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-top">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="nav-top">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/aboutus">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/ico">ICO</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Magazine</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://ozonewatch.gsfc.nasa.gov/">Ozone</a>
                                </li>
                                <li className="nav-item" style={{ marginRight: "-25px" }}>
                                    <div class="dropdown show  " >
                                        <a className="btn bg-transparent dropdown-toggle" href="videos/commerja-1080p-220405.mp4" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Forum</a>

                                        <div class="justify-content-start cont header dropdown-menu row" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: '#131415' }}>
                                            <div className="col"><a className="p-2 bd-highlight col-2" href="/Bitcash">Vote</a></div>
                                            {/* <div className="col"> <a className="p-2 bd-highlight col-2" href="/Xcash">XCa$h</a></div> */}
                                        </div>

                                    </div>
                                </li>
                                <li className="nav-item" style={{ marginRight: "-25px" }}>
                                    <div class="dropdown show  " >
                                        <a className="btn bg-transparent dropdown-toggle" href="videos/commerja-1080p-220405.mp4" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tokens</a>

                                        <div class="justify-content-start cont header dropdown-menu row" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: '#131415' }}>
                                            <div className="col"><a className="p-2 bd-highlight col-2" href="/Bitcash">BitCa$h</a></div>
                                            <div className="col"> <a className="p-2 bd-highlight col-2" href="/Xcash">XCa$h</a></div>
                                            <div className="col"> <a className="p-2 bd-highlight col-2" href="/">NFT's</a></div>

                                        </div>

                                    </div>
                                </li>
                            </ul>
                            <ul className="social-media-header">
                                <li><a href="#"><img src="images/facebook.svg" /></a></li>
                                <li><a href="#"><img src="images/twitter-y.svg" /></a></li>
                                <li><a href="#"><img src="images/insta.svg" /></a></li>
                                <li><audio id="myAudio" src="videos/new-websong.mp3" autoPlay="autoplay" />
                                    <a onclick="togglePlay()" className="play"><span className="mute"><i className="fa fa-volume-down" /><i className="fa fa-volume-mute" /></span></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/*  <ul class="audio-sec">
  <li>
    <audio id="myAudio" src="videos/Life_intro.mp3" autoplay="autoplay"></audio>
    <a onClick="togglePlay()" class="play"><span class="mute"><i class="fa fa-volume-down"></i><i class="fa fa-volume-mute"></i></span></a>
  </li>
</ul> */}
            </header> {/* /header */}
            {/*   <video width="320" height="240" controls autoplay loop>
<source src="videos/Life-intro.mp4" type="video/mp4">
    </video> */}
            {/*     <video width="320" height="240" controls autoplay loop>
<source src="videos/Life-intro.mp4" type="video/mp4">
    </video>
     */}
            {/* <div class="header-btm">
<img src="images/header.png">
    </div> */}
            <section className="hero-sec home-sec d-flex flex-wrap align-items-center" touching="fixed-sec" id="home-section1">
                <video id="video-1" className="video-block" width="65%" height={250} poster="images/section-img1.jpg" autoPlay loop muted>
                    <source src="videos/banner-gif.mp4" type="video/mp4" />
                </video>
                {/* <div class="bg-gif">
  <img src="images/banner-gif.gif">
</div> */}
                <div className="home-sec-title">
                    <div className="container">
                        <div className="inner-banner-sec">
                            <div className="text-box" data-aos-duration={1000} data-aos="fade-up">
                                <div className="text-inner-box text-center">
                                    <h1>Secure crypto solutions and utilizing blockchain technology.</h1>
                                    <p>The first decentralized Marketplace which makes simplifies and standarizes data with blockchain technology. </p>
                                    <a href="#" className="btn btn-more">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*  <section class="banner-sec">
<div class="container">
  <div class="inner-banner-sec">
    <div class="text-box" data-aos-duration="1000" data-aos="fade-right" data-aos-easing="ease-in-sine">
      <div class="text-inner-box">
         <h1>WORLD FIRST DECENTRALIZED MARKET PLACE WITH BLOCKCHAIN INFRASTRUCTURE</h1>
          <p>The first decentralized Marketplace which makes simplifies and standarizes data with blockchain technology. We provides user-friendly, efficient and secure crypto solutions and utilizing blockchain technology.</p>
          <a href="#" class="btn btn-more">Download White Paper</a>
      </div>
    </div>
    <div class="img-box"  data-aos-duration="1000" data-aos="fade-left" data-aos-easing="ease-in-sine">
     <iframe width="100%" height="400" src="https://www.youtube.com/embed/zdpmOZjx2JM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>
    </section>
 */}
            <section className="services-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" data-aos-duration="2000" data-aos="fade-up">
                            <h2>Our Core Services</h2>
                            <img src="images/services.png" className="border-b" />
                        </div>
                        <div className="col-md-4">
                            <div className="services-box" data-aos-duration="2000" data-aos="fade-up">
                                <img src="images/Cryptoguys-Landing.png" />
                                <h4>SMART LITERACY MODULE</h4>
                                <ol className="ml-3 text-left">
                                    <li style={{ listStyle: "auto" }}>
                                        THE CONSTRUCTION OF SCHOOLS IN
                                        DEVELOPING COUNTRIES, EQUIPPPED
                                        WITH SMART BOARDS , TABLETS
                                        and TRAINED TEACHERS.
                                    </li>
                                    <li style={{ listStyle: "auto" }}>
                                        PROVIDING ONGOING PROFESSIONAL
                                        DEVELOPMENT TRANING FOR
                                        TEACHING STAFF GLOBALLY.
                                    </li>
                                    <li style={{ listStyle: "auto" }}>
                                        INRODUCE DEFI AND BLOCKCHAIN
                                        TECHNOLOGY AS A GLOBAL INITIATIVE
                                        FOR HUMAITY’S EMPOWERMENT.
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="services-box" data-aos-duration="2000" data-aos="fade-up">
                                <img src="images/ds.png" />
                                <h4>PROACTIVE ENVIROMENTAL PROGRAMS</h4>
                                <ol className="ml-3 text-left">
                                    <li style={{ listStyle: "auto" }}>
                                        CARBON SEQUESTRATION INITIATIVES SUPPORTING INDUSTRIES TO ADOPT MORE ECO-FRIENDLY METHODS PRODUCTIONS.
                                    </li>
                                    <li style={{ listStyle: "auto" }}>
                                        LAND CONSERVATION INVOLVING REFORESTRATION AND AFORESTRATION.
                                    </li>
                                    <li style={{ listStyle: "auto" }}>
                                        IMPLEMENTATION OF OZONE REGENERATION PROTOCOLS ALONG WITH THE NECESSARY EQUIPMENT.
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="services-box" data-aos-duration="2000" data-aos="fade-up">
                                <img src="images/d.png" />
                                <h4>ADAPTIVE SOCIAL AND ECONOMIC ASSISTANCE.</h4>
                                <ol className="ml-3 text-left">
                                    <li style={{ listStyle: "auto" }}>
                                        PROVIDE ACTUAL LIFE-SAVING FIRST AID KITS WITH BASIC FIRST RESPONSE EQUIPMENT AND THE RELEVANT INSTRUCTION MANUALS.</li>
                                    <li style={{ listStyle: "auto" }}>
                                        INCREASING THE ACCESSABILTY TO COUNSELING FOR TRAMUA/PTSD VICTIMS. (VETERANS/CIVILIANS.)
                                    </li>
                                    <li style={{ listStyle: "auto" }}>
                                        ASSISTING IN CULTIVATING NEW SOCIO-ECONOMIC HABITS AND PRACTICES TO SECURE HUMANITY’S FUTURE.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-sec home-about-sec">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="about-img-box" data-aos-duration={1000} data-aos="fade-right" data-aos-easing="ease-in-sine">
                                <img src="images/cre-gif.gif" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="about-text-box" data-aos-duration={1000} data-aos="fade-left" data-aos-easing="ease-in-sine">
                                <h2>about Us</h2>
                                <p>Air 4 Life Foundation (A4LF) is a legally registered nonprofit founded in Casper, Wyoming USA in December 2021.  A4LF global initiative is focused mainly on the development of an array of innovative programs to drastically reduce Global Air Pollution, by reducing the Carbon footprints and greenhouse gases that directly impact on climate change, which result from the major manufacturing, lumber, and mining concerns. </p>
                                <a href="#" className="btn btn-more">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="roadmap-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="heading-sec" data-aos-duration="2000" data-aos="fade-up">
                                <h2>Our  Roadmap</h2>
                                <img src="images/road-map.png" className="border-b" />
                                <p>The accomplishment of A4LF mission can only be realized with the generous contributions and support from the entire global community.</p>
                            </div>
                        </div>
                    </div>

                    <ul className="bottom-box-sec">
                        <li className="first-box" data-aos-duration="800" data-aos="fade-right" data-aos-easing="ease-in-sine">
                            <p><strong>A4LF FORMATION AND PLATFORM DEVELOPMENT</strong></p>
                            <p>This officially commence in the Last quarter of 2021 with the Incorporation by the State Department if the great State of Wyoming.</p>
                        </li>
                        <li className="second-box" data-aos-duration="1200" data-aos="fade-left" data-aos-easing="ease-in-sine">
                            <p><strong>GROUNDWORK NEEDED FOR MISSION SUCCESS</strong></p>
                            <p>The creation and launch of website and necessary Apps. Establishing of social media presence and various platforms. First quarter 2021.</p>
                        </li>
                        <li className="third-box" data-aos-duration="1800" data-aos="fade-right" data-aos-easing="ease-in-sine">
                            <p><strong>LOGISTIC SUPPORT NECESSARY FOR MISSION ACCOMMPLISHMENT</strong></p>
                            <p>The establishment of Contractual arrangemet for the manufacturing and delivery of Oxygen generating First Aid Response kits. First quarter 2021.</p>
                        </li>
                        <li className="fourth-box" data-aos-duration="2200" data-aos="fade-left" data-aos-easing="ease-in-sine">
                            <p><strong>DEVELOP WORKING PARTNERSHIPS</strong></p>
                            <p>The selecting of other non-profits that may have geographical expertise and local knowledge will add in the speedier success of the overall objectives. Status is presently still on going during the first quarter of 2022.</p>
                        </li>
                    </ul>
                </div>
                <a href="#" className="btn btn-more text-center d-block">Download White Paper</a>
            </section>
            {/* footer */}
            <footer className="footer">
                <div className="foter-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="foter-logo">
                                    <a href="#"><img src="images/Logo.png" /></a>
                                </div>
                                <div className="d-flex flex-wrap justify-content-center">
                                    <ul className="list-unstyled social-media d-flex justify-content-center">
                                        <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                                        <li><a href="#"><i className="fab fa-twitter" /></a></li>
                                        <li><a href="#"><i className="fab fa-instagram" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-wrap text-center">
                    <div className="container">
                        © Lindon ICO, 2021
                    </div>
                </div>
            </footer>
            {/* /footer */}
        </div>

    );
}