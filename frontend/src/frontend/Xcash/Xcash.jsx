import React, { useState } from "react";
import XcashFirstPage from "./XcashFirst";
import XcashSecondPage from './XcashSecond';
import XcashThirdPage from './XcashThird'
import XcashFourthPage from "./XcashFourth";
import XcashFifthPage from "./XcashFifth";
import XcashSixthPage from "./XcashSixth";
export default function Xcash() {
    const [video, setVideoCount] = useState(0);

    let [count, setcount] = useState(0);

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
                    <div className="login-sec video">
                        <div className="cust-container">
                            <video controls >
                                <source src="videos/2.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="heading-sec text-center">
                                <button type="submit" className="btn btn-more" onClick={() => { setVideoCount(1) }} >White Paper</button>
                            </div>
                            <img src="images/services.png" className="border-b" style={{ marginTop: "10px" }} />
                        </div>
                    </div>                  

                </div>
            </>
        )

    } else {

        return (
            <>
                <div className="wrapper-mainX">
                    <table cellPadding={0} cellSpacing={0} align="center" width={960} border={0} className="table-main">
                        <tbody><tr>
                            <td className="bg-mainX">

                                {page === 1 ? (<XcashFirstPage></XcashFirstPage>)
                                    : page === 2 ? (<XcashSecondPage></XcashSecondPage>)
                                        : page === 3 ? (<XcashThirdPage></XcashThirdPage>)
                                            : page === 4 ? (<XcashFourthPage></XcashFourthPage>)
                                                : page === 5 ? (<XcashFifthPage></XcashFifthPage>)
                                                    : page === 6 ? (<XcashSixthPage></XcashSixthPage>) :
                                                        ("")}

                                {/* 
                                {count > 1 ? <button className="btn btn-more yy" onClick={() => { decrementCount(count) }}> Previous Page</button> : ""}
    
    
                                {count <= 2 ? <button style={{ marginLeft: "40rem" }} className="btn btn-more" onClick={() => { handleCount(count) }}>Next Page</button> : ""} */}

                                <div className='d-flex justify-content-between'>
                                    {count > 1 ? <div style={{ textAlign: 'left' }}> <button className="btn btn-more yy" onClick={() => { decrementCount(count) }}> Previous Page</button>  </div> : ""}

                                    {count < 6 ? <div style={{ textAlign: 'right' }}> <button className="btn btn-more" onClick={() => { handleCount(count) }}>Next Page</button>  </div> : ""}



                                </div>

                            </td>
                        </tr>
                        </tbody></table>
                </div>


            </>
        );

    }



}