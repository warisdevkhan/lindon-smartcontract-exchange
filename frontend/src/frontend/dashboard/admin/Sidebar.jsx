import React from "react";
import { Link } from "react-router-dom";
export default function Sidebar(props) {
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar-wrap">
      <div className="sidebar-menu">
        <ul className="side-nav">
          <li className={props.active === "dashboard" ? "active" : ""}>
            <Link to="/dashboard" state={{ name: "Dashboard" }}>
              <span className="menu-icon">
                <i className="fa fa-home"></i>
              </span>
              <span className="menu-text">Dashboard</span>
            </Link>
          </li>
          {role === "admin" && (
            <>
              <li className={props.active === "transaction" ? "active" : ""}>
                <Link
                  to="/all-transactions"
                  state={{ name: "All Transactions" }}
                >
                  <span className="menu-icon">
                    <i className="fa fa-list-alt"></i>
                  </span>
                  <span className="menu-text">All Transactions</span>
                </Link>
              </li>
              <li className={props.active === "allusers" ? "active" : ""}>
                <Link to="/all-users" state={{ name: "All Users" }}>
                  <span className="menu-icon">
                    <i className="fa fa-list-alt"></i>
                  </span>
                  <span className="menu-text">All Users</span>
                </Link>
              </li>
            </>
          )}

          <li className={props.active === "wallet" ? "active" : ""}>
            <Link to="/wallet" state={{ name: "Wallet" }}>
              <span className="menu-icon">
                <i className="fa fa-credit-card"></i>
              </span>
              <span className="menu-text">Wallet</span>
            </Link>
          </li>
          {role === "user" && (
            <>
              <li className={props.active === "transaction" ? "active" : ""}>
                <Link to="/transactions" state={{ name: "Transactions" }}>
                  <span className="menu-icon">
                    <i className="fa fa-list-alt"></i>
                  </span>
                  <span className="menu-text">Transactions</span>
                </Link>
              </li>
              <li className={props.active === "purchasetoken" ? "active" : ""}>
                <Link to="/purchase-token" state={{ name: "Purchase Token" }}>
                  <span className="menu-icon">
                    <i className="fa fa-credit-card"></i>
                  </span>
                  <span className="menu-text">Purchase Token</span>
                </Link>
              </li>

              <li className={props.active === "kyc" ? "active" : ""}>
                <Link to="/kyc" state={{ name: "KYC" }}>
                  <span className="menu-icon">
                    <i className="fa fa-money money-fa"></i>
                  </span>
                  <span className="menu-text">KYC</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
