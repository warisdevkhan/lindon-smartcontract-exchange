import React from "react"
export default function Sidebar(props) {
    return (
        <div className="sidebar-wrap">
            <div className="sidebar-menu">
                <ul className="side-nav">
                    <li className={props.active == "dashboard" ? "active" : ""}>
                        <a href="/dashboard"><span className="menu-icon">
                            <i className="fa fa-home"></i>
                        </span><span className="menu-text">Dashboard </span></a>
                    </li>
                    <li className={props.active == "transaction" ? "active" : ""}>
                        <a href="/transactions">
                            <span className="menu-icon">
                                <i className="fa fa-list-alt"></i>
                            </span>
                            <span className="menu-text">Transactions</span></a>
                    </li>
                    <li className={props.active == "wallet" ? "active" : ""}>
                        <a href="/wallet"><span className="menu-icon">
                            <i className="fa fa-credit-card"></i>
                        </span>
                            <span className="menu-text">Wallet</span></a>
                    </li>
                    <li className={props.active == "purchasetoken" ? "active" : ""}>
                        <a href="/purchase-token"><span className="menu-icon">
                            <i className="fa fa-credit-card"></i>
                        </span>
                            <span className="menu-text">Purchase Token</span></a>
                    </li>
                    {/* <li className={props.active == "payment" ? "active" : ""}>
                        <a href="/payments"><span className="menu-icon">
                            <i className="fa fa-money money-fa"></i>
                        </span>
                            <span className="menu-text">Payment</span></a>
                    </li> */}
                </ul>
            </div>
        </div>

    );
}