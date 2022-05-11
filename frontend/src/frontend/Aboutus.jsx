import React from "react";
import Header from "./header";
import AOS from "aos";
export default function Aboutus() {
    AOS.init();
    return (
        <div className="bg-about-page">
            <div className="bg-about">
                {/* <video autoplay muted loop>
    <source src="videos/waterfall-animated.mp4" type="video/mp4" />
  </video> */}
                <img src="images/sky.gif" />
            </div>
            {/*  <div id="particles-js"></div> */}
            {/*  <div class="bg-gif">
     <img src="">
   </div>
 */}
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
                                <li className="nav-item ">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item active">
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
                                <li className="nav-item" style={{marginRight : "-25px"}}>
                                    <div class="dropdown show  " >
                                        <a className="btn bg-transparent dropdown-toggle" href="videos/commerja-1080p-220405.mp4" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Forum</a>

                                        <div class="justify-content-start cont header dropdown-menu row" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: '#131415' }}>
                                        <div className="col"><a className="p-2 bd-highlight col-2" href="/Bitcash">Vote</a></div>
                                        {/* <div className="col"> <a className="p-2 bd-highlight col-2" href="/Xcash">XCa$h</a></div> */}
                                    </div>

                                    </div>
                                </li>
                                <li className="nav-item" style={{marginRight : "-25px"}}>
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
            </header> {/* /header */}
            <div className="header-btm">
                <img src="images/header.png" />
            </div>
            <section className="about-sec about-us-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="about-text-box text-center" data-aos-duration={1000} data-aos="fade-up">
                                <h2>about Us</h2>
                                <img src="images/services.png" className="border-b" />
                                <p>Aliquam erat volutpat. Vivamus ut libero risus. Integer non pulvinar enim, a viverra mauris. Nulla a hendrerit neque. Fusce ac rhoncus magna. Ut dui eros, malesuada a nisl ut, gravida imperdiet felis. Sed id dapibus lectus. Integer ut facilisis quam. In finibus nisi vitae laoreet malesuada. Quisque ultrices a nunc sed dignissim. Morbi ac consequat nulla. Donec suscipit tellus sit amet ex efficitur sodales.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nibh ante, blandit sed elit quis, eleifend molestie dui. Vivamus cursus arcu ac ex hendrerit fermentum. Quisque tempus euismod mauris sit amet pharetra. Sed vestibulum elit non mollis fringilla. Duis efficitur enim elit, quis convallis odio ultricies eget. Morbi tellus nisl, hendrerit in odio a, interdum aliquam felis. Cras in auctor lacus, vitae bibendum dolor. Duis porta, mauris ac condimentum tincidunt, metus nisi lobortis justo, ut sodales metus dolor sed nunc. Quisque dapibus in lorem quis interdum. Praesent sed nisl a magna pellentesque dignissim. In sed sapien purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut lobortis ex nec dui elementum, ac euismod justo ultricies. Nullam non finibus eros. Quisque pharetra suscipit massa, sit amet maximus ipsum mollis vel.</p>
                                <a href="#" className="btn btn-more">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="services-sec about-page-services">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" data-aos-duration={2000} data-aos="fade-up">
                            <h2>Our Core Services</h2>
                            <img src="images/services.png" className="border-b" />
                        </div>
                        <div className="col-md-4">
                            <div className="services-box" data-aos-duration={2000} data-aos="fade-up">
                                <img src="images/Cryptoguys-Landing.png" />
                                <h4>Smart Trading Modules</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit Lorem ipsum.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="services-box" data-aos-duration={2000} data-aos="fade-up">
                                <img src="images/ds.png" />
                                <h4>Adaptive Social Assistant</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit Lorem ipsum.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="services-box" data-aos-duration={2000} data-aos="fade-up">
                                <img src="images/d.png" />
                                <h4>Analyzer of the News</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam, maximus ut accumsan ut, posuere sit Lorem ipsum.</p>
                            </div>
                        </div>
                    </div>
                </div>
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
                <div class="d-flex flex-column bd-highlight mb-3 justify-content-start cont">
                    <div class="p-2 bd-highlight"><a className="footerlinks" href="./term-of-use">Term of Use</a></div>
                    <div class="p-2 bd-highlight"><a className="footerlinks" href="./privacy-policy">Privacy Policy</a></div>
                    <div class="p-2 bd-highlight"><a className="footerlinks" href="/faq">Frequently Asked Questions</a></div>

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