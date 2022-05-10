import React, { useState } from "react";
import BitcashFirstPage from "./BitcashFirst";
// import XcashSecondPage from './XcashSecond';
// import XcashThirdPage from './XcashThird'
// import XcashFourthPage from "./XcashFourth";
// import XcashFifthPage from "./XcashFifth";
// import XcashSixthPage from "./XcashSixth";
export default function Bitcash() {

    const [video, setVideoCount] = useState(0);

    let [count, setcount] = useState(1);

    let [page, setpage] = useState(1);

    let handleChange = (data) => {

        console.log("here is fdata  " + data);
        setpage(data);

    }
    let handleCount = (data) => {
        console.log("here is my count " + data);
        data++;
        setcount(data);
        handleChange(data);
    }
    let decrementCount = (data) => {
        data--;
        setcount(data);
        handleChange(data);

    }

    if (video == 0) {

        return (
            <>
                <div>

                    <div className="header-btm">
                        <img src="images/header.png"></img>
                    </div>
                    <div className="login-sec">
                        <div className="cust-container">
                            <div className="inner-login-sec">
                                <a href="#" className="logo"><img src="images/Logo.png" /></a>
                                <div style={{ paddingTop: "100px" }}>
                                    <video height={500} controls>
                                        <source src="videos/1.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="heading-sec text-center">
                                        <button type="submit" className="btn btn-more" onClick={() => { setVideoCount(1) }} >White Paper</button>
                                    </div>
                                    <img src="images/services.png" className="border-b" style={{ marginTop: "10px" }} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )

    } else {

        return (
            <>
                <div className="wrapper-mainB">
                    <table cellPadding={0} cellSpacing={0} align="center" width={960} border={0} className="table-main">
                        <tbody><tr>
                            <td className="bg-mainB">

                                {page === 1 ? (<BitcashFirstPage></BitcashFirstPage>) : ("")}

                                {/* <p className="Bp"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                                Aldus PageMaker including versions of Lorem Ipsum.</p>

                            <p className="Bp"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                                Aldus PageMaker including versions of Lorem Ipsum.</p> */}

                                <div className='d-flex justify-content-between'>
                                    {count > 1 ? <div style={{ textAlign: 'left' }}> <button className="btn btn-more yy" onClick={() => { decrementCount(count) }}> Previous Page</button>  </div> : ""}

                                    {count === 1 ? <div style={{ textAlign: 'right' }}> <button className="btn btn-more" onClick={() => { handleCount(count) }}>Next Page</button>  </div> : ""}



                                </div>



                            </td>
                        </tr>
                        </tbody></table>
                </div>


            </>
        );
    }
}