import React from "react";
import Header from "./header";
import AOS from "aos";
export default function Aboutus() {
    AOS.init();
    return (
        <div className="bg-image">
            <Header activeHeader={"About"} />
            <div className="header-btm">
                <img src="images/header.png"></img>
            </div>
            <div className="about-sec about-us-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="about-text-box text-center" data-aos-duration="1000" data-aos="fade-up">
                                <h2>about Us</h2>
                                <img src="images/services.png" className="border-b" />
                                <p>Aliquam erat volutpat. Vivamus ut libero risus. Integer non pulvinar enim, a viverra mauris. Nulla a hendrerit neque. Fusce ac rhoncus magna. Ut dui eros, malesuada a nisl ut, gravida imperdiet felis. Sed id dapibus lectus. Integer ut facilisis quam. In finibus nisi vitae laoreet malesuada. Quisque ultrices a nunc sed dignissim. Morbi ac consequat nulla. Donec suscipit tellus sit amet ex efficitur sodales.</p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nibh ante, blandit sed elit quis, eleifend molestie dui. Vivamus cursus arcu ac ex hendrerit fermentum. Quisque tempus euismod mauris sit amet pharetra. Sed vestibulum elit non mollis fringilla. Duis efficitur enim elit, quis convallis odio ultricies eget. Morbi tellus nisl, hendrerit in odio a, interdum aliquam felis. Cras in auctor lacus, vitae bibendum dolor. Duis porta, mauris ac condimentum tincidunt, metus nisi lobortis justo, ut sodales metus dolor sed nunc. Quisque dapibus in lorem quis interdum. Praesent sed nisl a magna pellentesque dignissim. In sed sapien purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut lobortis ex nec dui elementum, ac euismod justo ultricies. Nullam non finibus eros. Quisque pharetra suscipit massa, sit amet maximus ipsum mollis vel.</p>
                                <a href="#" className="btn btn-more">Learn More</a>
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

                    <div className="row">
                        <div className="col ">

                            <h2 className="text-center mt-4">Air quality index and Ozone Status</h2>
                            <img src="images/services.png" className="" alt="" />
                            <p></p>
                            <a href="https://earthdata.nasa.gov/earth-observation-data/near-real-time/hazards-and-disasters/air-quality" target="_blank" className="btn btn-more text-center buttonSpaces" >Air Quality</a>
                            <a href="https://ozonewatch.gsfc.nasa.gov/" className="btn btn-more  buttonSpaces">Ozone status</a>

                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
}