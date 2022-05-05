import React, { useEffect, useState } from "react";
import AOS from "aos";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import StripeCheckOut from "react-stripe-checkout";
import { STRIPE_KEY, API_URL } from "../../../Config";
export default function Payments(props) {
    const [firstTab, setFirstTab] = useState(true)
    const [secTab, setSecTab] = useState(false)
    const [thirdTab, setThirdTab] = useState(false)
    const [userInfo, setUserInfo] = useState({
        name: "",
        phone: "",
        dob: "",
        walletaddress: ""
    })
    const location = useLocation()
    const { amount, getAmount, currency } = location.state
    useEffect(() => {
        document.title = "Admin :: Dashboard"
        document.body.classList.add('menu-open');
    }, [])
    async function saveDetails(token) {
        const option = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem("userToken")
            },
            body: JSON.stringify({
                "dateofPurchase": Date.now(),
                "amountOfToken": getAmount,
                "PaymentRecipet": token
            })
        }
        await fetch(`${API_URL}/payment/receipt`, option)
            .then(async (response) => {
                const res = await response.json();
                if (res.success) {
                    alert("payment successfully...")
                }
            }).catch((e) => {
                console.log(e)
            })
    }
    async function payBitpay() {
        const option = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem("userToken")
            },
            body: JSON.stringify({
                "price": amount,
                "currency": currency
            })
        }
        await fetch(`${API_URL}/payment/invoice`, option)
            .then(async (response) => {
                const res = await response.json();
                if (res.success) {
                    window.open(res.data.url, "_blank")
                }
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
    }
    function changeColor(effect) {
        if (effect == "bin")
            document.getElementById("bitpay-button").style.color = "#F1B820"
        else if (effect == "bout")
            document.getElementById("bitpay-button").style.color = "#212529"
        else if (effect == "in")
            document.getElementById("stripe-button").style.color = "#F1B820"
        else
            document.getElementById("stripe-button").style.color = "#212529"
    }

    function handleTab(number) {
        if (number == "sec") {
            if (userInfo.walletaddress == "") {
                alert("please enter wallet address");
            } else {
                setFirstTab(!firstTab)
                setSecTab(!secTab)
            }
        } else if (number == "third") {
            if (userInfo.name == "" || userInfo.phone == "" || userInfo.dob == "") {
                alert("please fill all field");
            } else {
                setSecTab(!secTab)
                setThirdTab(!thirdTab)
            }
        } else if (number == "t-back") {
            setThirdTab(!thirdTab)
            setSecTab(!secTab)
        } else if (number == "s-back") {
            setSecTab(!secTab)
            setFirstTab(!firstTab)
        }
    }
    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }
    return (
        <div className="main-wrap">
            <DashboardHeader />


            <div className="dashboard-wraper">
                <Sidebar active={"payment"} />
                <div className="content-wrap">
                    <div className="dashboard-content p">
                        <div className="dash-body-blk">
                            <div className="dash-report-blk px-xl-4 px-2 pt-2">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="payment-box-top">
                                            <div className="admin-tabs-box">
                                                <ul className="nav nav-tabs">
                                                    <li className=""><a className={firstTab ? "active" : undefined}><span className="count">1</span> <span>Wallet Address</span></a></li>
                                                    <li><a className={secTab ? "active" : undefined}><span className="count">2</span> <span>Personal Details</span></a></li>
                                                    <li><a className={thirdTab ? "active" : undefined}><span className="count">3</span> <span>Card Details</span></a></li>
                                                </ul>
                                                <div className="tab-content">
                                                    <div id="home" className={firstTab ? "tab-pane active" : "tab-pane fade"}>
                                                        <div className="card-btm">
                                                            <div className="form-group">
                                                                <label>Wallet Address</label>
                                                                <input type="text" name="walletaddress" placeholder="AKSYEGD72KO92NC6J4G68KK" value={userInfo.walletaddress} onChange={handleChange} />
                                                            </div>
                                                            <div className="btn btn-full" onClick={() => handleTab("sec")}>NExt</div>
                                                        </div>
                                                    </div>
                                                    <div id="menu1" className={secTab ? "tab-pane active" : "tab-pane fade"}>

                                                        <div className="card-btm">
                                                            <form>
                                                                <div className="form-group">
                                                                    <label>Name</label>
                                                                    <input type="text" name="name" placeholder="" value={userInfo.name} onChange={handleChange} />
                                                                </div>
                                                                <div className="com-box-fifty d-flex align-items-center">
                                                                    <div className="form-group">
                                                                        <label>Phone Number</label>
                                                                        <input type="text" name="phone" placeholder="" value={userInfo.phone} onChange={handleChange} />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Date of birth</label>
                                                                        <input type="text" name="dob" placeholder="" value={userInfo.dob} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </form>
                                                            <div className="btn-both-main justify-content-center d-flex align-items-center flex-wrap">
                                                                <div onClick={() => handleTab("s-back")} className="btn btn-back">Back</div>
                                                                <div className="btn btn-full" onClick={() => handleTab("third")}>NExt</div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div id="menu2" className={thirdTab ? "tab-pane active" : "tab-pane fade"} >

                                                        <div className="card-btm">
                                                            {/* <form>
                                                                <div className="form-group">
                                                                    <label>Card Number</label>
                                                                    <input type="text" name="" placeholder="" />
                                                                </div>
                                                                <div className="com-box-fifty d-flex align-items-center">
                                                                    <div className="form-group">
                                                                        <div className="box-both-sec d-flex flex-wrap align-items-center">
                                                                            <div className="com-box-two">
                                                                                <label>CVC</label>
                                                                                <input type="text" name="" placeholder="" />
                                                                            </div>
                                                                            <div className="com-box-two">
                                                                                <label>Valid Till</label>
                                                                                <input type="text" name="" placeholder="" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Full Name</label>
                                                                        <input type="text" name="" placeholder="" />
                                                                    </div>
                                                                </div>
                                                                <div className="checkbox">
                                                                    <label><input type="checkbox" />Agree <a href="#"> Terms</a> And <a href="#">Conditions</a></label>
                                                                </div>
                                                            </form> */}
                                                            <div className="btn-both-main justify-content-center d-flex align-items-center flex-wrap">
                                                                {
                                                                    (currency != "ETH" && currency != "BTC") &&
                                                                    <StripeCheckOut
                                                                        description={`Payment`}
                                                                        stripeKey={STRIPE_KEY}
                                                                        token={(token) => saveDetails(token)}
                                                                        name={"Get ETH"}
                                                                        amount={amount * 100}
                                                                        currency={currency}
                                                                        allowRememberMe
                                                                        ComponentClass="div"
                                                                    >

                                                                        < a style={{ color: "#212529" }} onMouseOver={() => changeColor("in")} onMouseOut={() => changeColor("out")} id="stripe-button" className="btn btn-full">Pay with FIAT</a>
                                                                    </StripeCheckOut>
                                                                }
                                                                <a style={{ color: "#212529" }} onMouseOver={() => changeColor("bin")} onMouseOut={() => changeColor("bout")} id="bitpay-button" className="btn btn-full" onClick={payBitpay}>Pay with Bitpay</a>
                                                                <div className="btn btn-back" onClick={() => { handleTab("t-back") }}>Back</div>
                                                            </div>
                                                        </div>
                                                    </div>
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
        </div >
    );
}