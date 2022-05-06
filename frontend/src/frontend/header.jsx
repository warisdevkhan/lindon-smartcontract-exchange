import React, { useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { useRef } from "react";

export default function Header(props) {
    const player = useRef();
    const [playStatus, setPlayStatus] = useState(true);
    function togglePlay() {
        if (!playStatus)
            player.current.audio.current.play();
        else
            player.current.audio.current.pause();
    }

    return (
        <header>
            <AudioPlayer
                autoPlay
                src={"videos/new-websong.mp3"}
                style={{ display: "none" }}
                loop={true}
                ref={player}
                autoPlay={true}
            />
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand p-0" href="#"><img src="images/Logo.png"></img></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-top">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="nav-top">
                        <ul className="navbar-nav">
                            <li className={props.activeHeader == "Home" ? `nav-item active` : `nav-item`}>
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className={props.activeHeader == "About" ? `nav-item active` : `nav-item`}>
                                <a className="nav-link" href="/aboutus">About Us</a>
                            </li>
                            <li className={props.activeHeader == "Ico" ? `nav-item active` : `nav-item`}>
                                <a className="nav-link" href="/ico">ICO</a>
                            </li>
                            <li className={props.activeHeader == "Register" ? `nav-item active` : `nav-item`}>
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                            <li className={props.activeHeader == "Login" ? `nav-item active` : `nav-item`}>
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className={props.activeHeader == "Magazine" ? `nav-item active` : `nav-item`}>
                                <a className="nav-link" href="/">Magazine</a>
                            </li>
                            <li className={props.activeHeader == "Ozone" ? `nav-item active` : `nav-item`}>
                                <a className="nav-link" href="https://ozonewatch.gsfc.nasa.gov/">Ozone</a>
                            </li>
                            <li className={props.activeHeader == "DropDown" ? `nav-item active` : `nav-item`} style={{ marginRight: "-25px" }}>

                                {/* <a className="nav-link" href="/testing">Dropdown</a> */}

                                {/* bitcash and Xcash link */}
                                <div class="dropdown show  " >
                                    <a className="btn bg-transparent dropdown-toggle" href="videos/commerja-1080p-220405.mp4" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Fourm</a>

                                    <div class="justify-content-start cont header dropdown-menu row" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: '#131415' }}>
                                        <div className="col"><a className="p-2 bd-highlight col-2" href="/Bitcash">Vote</a></div>
                                        {/* <div className="col"> <a className="p-2 bd-highlight col-2" href="/Xcash">XCa$h</a></div> */}
                                    </div>

                                </div>


                                {/* explainary  video  here */}
                                {/* <a href="videos/commerja-1080p-220405.mp4">Tokens</a> */}

                            </li>
                            <li className={props.activeHeader == "DropDown" ? `nav-item active` : `nav-item`} style={{ marginRight: "-25px" }}>

                                {/* <a className="nav-link" href="/testing">Dropdown</a> */}

                                {/* bitcash and Xcash link */}
                                <div class="dropdown show " >
                                    <a className="btn bg-transparent dropdown-toggle" href="videos/commerja-1080p-220405.mp4" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tokens</a>

                                    <div class="justify-content-start cont header dropdown-menu row" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: '#131415' }}>
                                        <div className="col"><a className="p-2 bd-highlight col-2" href="/Bitcash">BitCa$h</a></div>
                                        <div className="col"> <a className="p-2 bd-highlight col-2" href="/Xcash">XCa$h</a></div>
                                        <div className="col"> <a className="p-2 bd-highlight col-2" href="/">NFT's</a></div>


                                    </div>

                                </div>


                                {/* explainary  video  here */}
                                {/* <a href="videos/commerja-1080p-220405.mp4">Tokens</a> */}

                            </li>
                        </ul>
                        <ul className="social-media-header">
                            <li><a href="#"><img src="images/facebook.svg"></img></a></li>
                            <li><a href="#"><img src="images/twitter-y.svg"></img></a></li>
                            <li><a href="#"><img src="images/insta.svg"></img></a></li>
                            <li>
                                <a onClick={() => togglePlay(!playStatus)} className="play">
                                    {
                                        playStatus ?
                                            <span className="mute">
                                                <i className="fa fa-volume-down" onClick={() => setPlayStatus(!playStatus)}></i>
                                            </span>
                                            :
                                            <span className="mute" >
                                                <i className="fa fa-volume-mute" style={{ display: "block" }} onClick={() => setPlayStatus(true)}></i>
                                            </span>
                                    }
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    );
}