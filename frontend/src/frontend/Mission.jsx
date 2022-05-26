import React,{useEffect} from "react";
import Header from "./header";
import AOS from "aos";
import { Link } from "react-router-dom";
export default function Mission() {
    AOS.init();
    useEffect(() => {
        document.title = "Mission";
    }, []);
    return (
        <div className="bg-about-page">
            <div className="bg-about">
                {/* <video autoplay muted loop>
    <source src="videos/waterfall-animated.mp4" type="video/mp4" />
  </video> */}
                <img src="images/sky.gif" className="h-100"/>
            </div>
            {/*  <div id="particles-js"></div> */}
            {/*  <div className="bg-gif">
     <img src="">
   </div>
 */}
            {/* header */}
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <Link className="navbar-brand p-0" to="/"><img src="images/Logo.png" /></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-top">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="nav-top">
                            <ul className="navbar-nav">
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/mission">Mission</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ico">ICO</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://www.global-pulse.org/" target="_blank">Magazine</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://ozonewatch.gsfc.nasa.gov/" target="_blank" >Ozone</a>
                                </li>
                                <li className="nav-item" style={{ marginRight: "-25px" }}>
                                    <div className="dropdown show  " >
                                        <a className="btn bg-transparent dropdown-toggle" href="videos/commerja-1080p-220405.mp4" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Forum</a>

                                        <div className="justify-content-start cont header dropdown-menu row" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: '#131415' }}>
                                            <div className="col"><a className="p-2 bd-highlight col-2" href="/Bitcash">Vote</a></div>
                                            {/* <div className="col"> <a className="p-2 bd-highlight col-2" href="/Xcash">XCa$h</a></div> */}
                                        </div>

                                    </div>
                                </li>
                                <li className="nav-item" style={{ marginRight: "-25px" }}>
                                    <div className="dropdown show  " >
                                        <a className="btn bg-transparent dropdown-toggle" href="videos/commerja-1080p-220405.mp4" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tokens</a>

                                        <div className="justify-content-start cont header dropdown-menu row" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: '#131415' }}>
                                            <div className="col"> <Link className="p-2 bd-highlight col-2" to="/Xcash">XCa$h</Link></div>
                                            <div className="col"><Link className="p-2 bd-highlight col-2" to="/Bitcash">BitCa$h</Link></div>
                                            <div className="col"> <a className="p-2 bd-highlight col-2" href="https://www.nft-xverse.com/" target="_blank">NFT's</a></div>
                                        </div>

                                    </div>
                                </li>
                            </ul>

                            <ul className="social-media-header">
                                <li><a href="#"><img src="images/facebook.svg" /></a></li>
                                <li><a href="#"><img src="images/twitter-y.svg" /></a></li>
                                <li><a href="#"><img src="images/insta.svg" /></a></li>
                                <li><audio id="myAudio" src="videos/new-websong.mp3" autoPlay />
                                    <a className="play"><span className="mute"><i className="fa fa-volume-down" /><i className="fa fa-volume-mute" /></span></a></li>
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
                                <h2>Mission</h2>
                                <img src="images/services.png" className="border-b" />
                                <p className="missionInfoText">
                                    OUR MISSION
                                    The vision of Air 4 Life Foundation (A4LF) is to ensure a sustainable future by 
                                    the eradication of illiteracy of the world’s children, while combating climate 
                                    change and providing actual lifesaving First Aid kits equipped with Self Generating 
                                    Oxygen Bottles.  Also, another long-term plan entails the construction of Medicinal 
                                    Oxygen generation facilities globally and the implementation of effective mechanisms
                                     to enhance Carbon sequestration and the removal of harmful pollutants from the environment. 
                                    <br /><br />
                                    A4LF will, also be actively advocating for the international community to adopt “BitCa$h “as a 
                                    Global Digital Currency, for facilitating swift and secure payments globally. The foundation
                                    intends to be fully functionally for seamless integration for the usage of this secure global 
                                    currency as the method of payment for salaries and the means to transmit funding for various 
                                    projects globally. This will better ensure that funds disbursed are used specifically for the purpose 
                                    that they were intended and manage from a smart phone, with no need for the usual delays and fees associated
                                    with traditional Centralized Banking Systems.  This is the “Future of Money,” which has been specifically
                                    tailored for use by non-profits and the global problem of accountability when funding projects.
                                    <br /><br />
                                    The Air 4 Life Foundation (A4LF) seeks to be completely self-sufficient in the future, funding its own 
                                    environmental programs, whilst rewarding its donors, all using funds generated from various fundraising
                                    activities supported by Web 3.0 Smart Contracts and its underlying technology. A4LF view Blockchain technology 
                                    as the future because, it brings the world together, by helping to create a unified, and efficient global 
                                    economy with one central global digital currency not issued by any single government or central bank. This
                                    can all be accomplished while still protecting the environment and constructing schools, staff by properly
                                    educated teachers.
                                    <br /><br />
                                    Unfortunately, a lot of blockchain technology still relies heavily on Carbon emitting energy sources
                                    such as those used in the validation process for nodes, at each block height as in the mining operations
                                    for Bitcoin and Ethereum in its Proof of Work consensus modules.  
                                    <br /><br />
                                    BITCA$H is in beta testing with early-stage development feasibility study, for an intended use of being, 
                                    the first green blockchain endeavoring, to be a carbon negative ecosystem. This will be the first where
                                    usage by consumers and merchants will directly benefit a worldwide humanitarian effort, that grants incentives
                                    for utilizing BITCA$H as a method of payment. The utilization of BitCa$h as a global digital currency, as being
                                    the most secure and efficient means to facilitate currency transaction and Commerce globally.

                                </p>
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
                <div className="d-flex flex-column bd-highlight mb-3 justify-content-start cont">
                    <div className="p-2 bd-highlight"><a className="footerlinks" href="./term-of-use">Term of Use</a></div>
                    <div className="p-2 bd-highlight"><a className="footerlinks" href="./privacy-policy">Privacy Policy</a></div>
                    <div className="p-2 bd-highlight"><a className="footerlinks" href="/faq">Frequently Asked Questions</a></div>

                </div>


                <div className="copyright-wrap text-center">
                    <div className="container">
                        © A4LF 2022
                    </div>
                </div>
            </footer>
            {/* /footer */}
        </div>

    );
}