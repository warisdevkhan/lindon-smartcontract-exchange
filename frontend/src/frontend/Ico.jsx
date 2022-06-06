import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import AOS from "aos";
import FlipCountdown from "@rumess/react-flip-countdown";

export default function Ico() {
  AOS.init();
  function learnMore() {
    document.getElementById("learn-btn").style.display = "none";
    document.getElementById("next-part").style.display = "block";
  }
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div>
      <Header activeHeader={"Ico"} />
      <div className="header-btm">
        <img src="images/header.png" />
      </div>
      <div
        className="hero-sec home-sec d-flex flex-wrap align-items-center home-sec-default"
        id="home-section1"
      >
        <video
          id="video-1"
          className="video-block2"
          width="100%"
          height="745"
          poster="images/section-img1.jpg"
          autoPlay
          loop
          muted
        >
          <source src={"videos/bg-video.mp4"} type="video/mp4" />
        </video>
        <div className="home-sec-title">
          <div className="container">
            <div className="inner-banner-sec">
              <div
                className="text-box"
                data-aos-duration="1000"
                data-aos="fade-up"
              >
                <div className="text-inner-box text-center">
                  <h1>
                    AN NGO OPERATING ON A SECURE GLOBAL PLATFORM UTILIZING SMART
                    BLOCKCHAIN TECHNOLOGY AS A SOLUTION
                  </h1>
                  <p>
                    Introducing the first Decentralized Autonomous Global
                    Humanitarian Organization (DAGHO), operating on a simple
                    standardized module for the procurement of funding and its
                    transparent disbursement globally, with the utilization of
                    smart contracts and web 3.0 technology, ensuring humanity’s
                  </p>
                  <h2>…RIGHT TO LIFE…</h2>
                  {/* <a href="#" className="btn btn-more">Learn More</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services-sec2">
        <div className="container">
          <div className="row">
            <div
              className="col-md-12"
              data-aos-duration="2000"
              data-aos="fade-up"
            >
              <h2>Our Core Services</h2>
              <img src="images/services.png" className="border-b" />
            </div>
            <div className="col-md-4">
              <div
                className="services-box"
                data-aos-duration="2000"
                data-aos="fade-up"
              >
                <img src="images/Cryptoguys-Landing.png" />
                <h4>SMART LITERACY MODULE</h4>
                <ol className="ml-3 text-left">
                  <li style={{ listStyle: "auto" }}>
                    THE CONSTRUCTION OF SCHOOLS IN DEVELOPING COUNTRIES,
                    EQUIPPPED WITH SMART BOARDS , TABLETS and TRAINED TEACHERS.
                  </li>
                  <li style={{ listStyle: "auto" }}>
                    PROVIDING ONGOING PROFESSIONAL DEVELOPMENT TRANING FOR
                    TEACHING STAFF GLOBALLY.
                  </li>
                  <li style={{ listStyle: "auto" }}>
                    INRODUCE DEFI AND BLOCKCHAIN TECHNOLOGY AS A GLOBAL
                    INITIATIVE FOR HUMAITY’S EMPOWERMENT.
                  </li>
                </ol>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="services-box"
                data-aos-duration="2000"
                data-aos="fade-up"
              >
                <img src="images/ds.png" />
                <h4>PROACTIVE ENVIROMENTAL PROGRAMS</h4>
                <ol className="ml-3 text-left">
                  <li style={{ listStyle: "auto" }}>
                    CARBON SEQUESTRATION INITIATIVES SUPPORTING INDUSTRIES TO
                    ADOPT MORE ECO-FRIENDLY METHODS PRODUCTIONS.
                  </li>
                  <li style={{ listStyle: "auto" }}>
                    LAND CONSERVATION INVOLVING REFORESTRATION AND
                    AFORESTRATION.
                  </li>
                  <li style={{ listStyle: "auto" }}>
                    IMPLEMENTATION OF OZONE REGENERATION PROTOCOLS ALONG WITH
                    THE NECESSARY EQUIPMENT.
                  </li>
                </ol>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="services-box"
                data-aos-duration="2000"
                data-aos="fade-up"
              >
                <img src="images/d.png" />
                <h4>ADAPTIVE SOCIAL AND ECONOMIC ASSISTANCE.</h4>
                <ol className="ml-3 text-left">
                  <li style={{ listStyle: "auto" }}>
                    PROVIDE ACTUAL LIFE-SAVING FIRST AID KITS WITH BASIC FIRST
                    RESPONSE EQUIPMENTAND THE RELEVANT INSTRUCTION MANUALS.
                  </li>
                  <li style={{ listStyle: "auto" }}>
                    INCREASING THE ACCESSABILTY TO COUNSELING FOR TRAMUA/PTSD
                    VICTIMS. (VETERANS/CIVILIANS.)
                  </li>
                  <li style={{ listStyle: "auto" }}>
                    ASSISTING IN CULTIVATING NEW SOCIO-ECONOMIC HABITS AND
                    PRACTICES TO SECURE HUMANITY’S FUTURE.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="counter-sec ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-12">
              <div className="timmer-box">
                <div className="time-speed-sec">
                  <p>Pre-sale is Live Now</p>
                  <div className="time-speed d-flex flex-wrap align-items-center">
                    <FlipCountdown
                      hideYear
                      hideMonth
                      dayTitle="Days"
                      hourTitle="Hours"
                      minuteTitle="Minutes"
                      secondTitle="Seconds"
                      size={"small"}
                      endAt={"2022-12-12 01:26:58"}
                    />
                    {/* <div className="time-fixed">
                      <h4 className="time-top">
                      02 <span className="text-bottom">Days</span>
                      </h4>
                      <span className="dot-sec"> : </span>
                    </div>
                    <div className="time-fixed">
                      <h4 className="time-top">
                        12 <span className="text-bottom">Hours</span>
                      </h4>
                      <span className="dot-sec"> : </span>
                    </div>
                    <div className="time-fixed">
                      <h4 className="time-top">
                        10 <span className="text-bottom">MINUTES</span>
                      </h4>
                      <span className="dot-sec"> : </span>
                    </div>
                    <div className="time-fixed">
                      <h4 className="time-top">
                      00 <span className="text-bottom">SECONDS</span>
                      </h4>
                    </div> */}
                  </div>
                  <div className="speedo-meeter">
                    <div className="d-flex justify-content-between">
                      <span>Sale Raised</span>
                      <span>Soft-caps</span>
                    </div>
                    <div className="full-sec">
                      <span className="white-color" />
                      <span className="dark-color" />
                    </div>
                    <a href="#" className="btn btn-more">
                      Purchase Tokens
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="about-sec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div
                className="about-img-box"
                data-aos-duration="1000"
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
              >
                <img src="images/about-us.png" />
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="about-text-box"
                data-aos-duration="1000"
                data-aos="fade-left"
                data-aos-easing="ease-in-sine"
              >
                <h2>about Us</h2>
                <p>
                  AIR4 LIFE FOUNDATION (A4LF) is a legally registered non-profit
                  organization incorporated in Casper Wyoming, USA in December
                  2021. A4LF global initiatives are focused on the development
                  and implementation of an array of innovative programs and
                  concepts, which seek to reduce/eliminate worldwide illiteracy
                  of children in developing countries, while also improving the
                  socio-economic welfare of humanity in general. This vision is
                  being accomplished using environmental conservation methods,
                  which will improve the Global Air Quality, by reducing the
                  Carbon footprints, aided by the removal of greenhouse gases
                  which directly impact climate change, utilizing Blockchain
                  Technology and DEFI.
                  <a
                    href="javascript:void(0)"
                    id="learn-btn"
                    className="btn btn-more"
                    onClick={learnMore}
                  >
                    Learn More
                  </a>
                  <div style={{ display: "none" }} id="next-part">
                    Air 4 Life Foundation envisions awakening an understanding
                    within the global community -that by functioning as one
                    unified body, with common objectives, for example the
                    education of all children, empowers humanity in all aspects
                    of life, along with the new revolutionary concept, that
                    “AIR” should be viewed as the single most important
                    commodity necessary for our existence as a race, and for the
                    preservation of all lifeforms on earth, now it can also be
                    used as a viable mechanism meeting the parameters necessary
                    for implementing a single Global Digital Currency, by
                    utilizing Smart Contracts and the underlying Blockchain
                    Technology which it entails. A Global Digital Currency free
                    from governmental influence or control -regulated only by
                    the global community usage of “AIR” as “A RIGHT TO LIFE” …
                    both physically and financially.
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="roadmap-sec2">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div
                className="heading-sec"
                data-aos-duration="2000"
                data-aos="fade-up"
              >
                <h2>Our Roadmap</h2>
                <img src="images/road-map.png" className="border-b" />
                <p>
                  The accomplishment of A4LF mission can only be realized with
                  the generous contributions and support from the entire global
                  community.
                </p>
              </div>
            </div>
          </div>

          <ul className="bottom-box-sec">
            <li
              className="first-box"
              data-aos-duration="800"
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
            >
              <p>
                <strong>A4LF FORMATION AND PLATFORM DEVELOPMENT</strong>
              </p>
              <p>
                This officially commence in the Last quarter of 2021 with the
                Incorporation by the State Department if the great State of
                Wyoming.
              </p>
            </li>
            <li
              className="second-box"
              data-aos-duration="1200"
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
            >
              <p>
                <strong>GROUNDWORK NEEDED FOR MISSION SUCCESS</strong>
              </p>
              <p>
                The creation and launch of website and necessary Apps.
                Establishing of social media presence and various platforms.
                First quarter 2021.
              </p>
            </li>
            <li
              className="third-box"
              data-aos-duration="1800"
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
            >
              <p>
                <strong>
                  LOGISTIC SUPPORT NECESSARY FOR MISSION ACCOMMPLISHMENT
                </strong>
              </p>
              <p>
                The establishment of Contractual arrangemet for the
                manufacturing and delivery of Oxygen generating First Aid
                Response kits. First quarter 2021.
              </p>
            </li>
            <li
              className="fourth-box"
              data-aos-duration="2200"
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
            >
              <p>
                <strong>DEVELOP WORKING PARTNERSHIPS</strong>
              </p>
              <p>
                The selecting of other non-profits that may have geographical
                expertise and local knowledge will add in the speedier success
                of the overall objectives. Status is presently still on going
                during the first quarter of 2022.
              </p>
            </li>
          </ul>
        </div>
        <div className="d-flex downloadWhitePaperText">
          <a
            href="images/whitepaper.pdf"
            target="_blank"
            className="btn btn-more text-center m-auto r"
          >
            Download White Paper
          </a>
        </div>
      </div>
      <Footer isDefaultColor={true} />
    </div>
  );
}
