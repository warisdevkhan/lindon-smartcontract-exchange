import React, { useEffect, useState } from "react";
import AOS from "aos";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import Line from "./assets/images/Line.png";
import { Link } from "react-router-dom";

export default function PurchaseToken() {
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("ETH");
    const [toAmount, setToAmount] = useState(0);
    const [fromAmount, setFromAmount] = useState(0);
    useEffect(() => {
        document.title = "Admin :: Dashboard"
        document.body.classList.add('menu-open');
    }, [])

    async function rateConvert(sendAmount) {
        setFromAmount(sendAmount)
        await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`)
            .then(async (response) => {
                await response.json()
                    .then((res) => {
                        console.log(res)
                        const getAmount = res[to] * sendAmount;
                        setToAmount(getAmount)
                    })
            }).catch((e) => {
            })
    }
    function handleFromChange(event) {
        setFrom(event.target.value)
    }
    function handleToChange(event) {
        setTo(event.target.value)
    }
    return (
        <div className="main-wrap">
            <DashboardHeader />
            <div className="dashboard-wraper">
                <Sidebar active={"purchasetoken"} />
                <div className="content-wrap">
                    <div className="dashboard-content p">
                        <div className="dash-body-blk">
                            <div className="dash-report-blk px-xl-4 px-2 pt-2">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="wallet-sec Purchase-sec">
                                            {/* <div className="text-center h2 text-warning">Coming soon...</div> */}
                                            <div className="inner-wallet-box">
                                                <div className="wallet-box">
                                                    <h1>Purchase Tokens <span><img src={Line} /></span></h1>
                                                    <div className="form-box">
                                                        <form>
                                                            <div className="form-group">
                                                                <label>You Send</label>
                                                                <div className="ntn-box-in">
                                                                    <input type="text" name="" id="from" placeholder="0" onChange={(e) => { rateConvert(e.target.value) }} />
                                                                    <div className="btn-box">
                                                                        <select onChange={handleFromChange}>
                                                                            <option value="USD">USD</option>
                                                                            <option value="BTC">BTC</option>
                                                                            <option value="ETH">ETH</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>You Get</label>
                                                                <div className="ntn-box-in">
                                                                    <input type="text" id="to" name="" placeholder="0" value={toAmount} onChange={(e) => { setToAmount(e.target.value) }} />
                                                                    <div className="btn-box">
                                                                        <select onChange={handleToChange}>
                                                                            <option value="ETH">ETH</option>
                                                                            <option value="BTC">BTC</option>
                                                                            <option value="USD">USD</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <Link to={fromAmount > 0 && from != to ? `/payments` : `/purchase-token`} state={{ amount: fromAmount, getAmount: toAmount, currency: from }}>
                                                        <div className="btm-wallet">
                                                            <a href="#" className="btn btn-full" >Buy Tokens</a>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

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