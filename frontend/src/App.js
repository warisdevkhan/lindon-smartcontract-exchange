import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ico from "./frontend/Ico";
import Home from "./frontend/Home";
import Login from "./frontend/Login";
import Register from "./frontend/Register";
import Mission from "./frontend/Mission";
import Dashboard from "./frontend/dashboard/admin/dashboard";
import Payments from "./frontend/dashboard/admin/Payments";
import PurchaseToken from "./frontend/dashboard/admin/PurchaseToken";
import Wallet from "./frontend/dashboard/admin/Wallet";
import Transaction from "./frontend/dashboard/admin/Transaction";
import Xcash from "./frontend/Xcash/Xcash";
import Bitcash from "./frontend/Bitcash/Bitcash";
import Kyc from "./frontend/dashboard/admin/Kyc";
import AllUsers from "./frontend/dashboard/admin/AllUsers";
import UserDetails from "./frontend/dashboard/admin/UserDetails";
import React, { useState } from "react";
import TermOfUse from "./frontend/TermOfUse";
import PrivacyPolicy from "./frontend/PrivacyPolicy";
import Faq from "./frontend/Faq";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ico" element={<Ico />} />
          <Route path="/login" element={<Login setRole={setRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/term-of-use" element={<TermOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/Xcash" element={<Xcash />} />
          <Route path="/Bitcash" element={<Bitcash />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />

          {role === "admin" && (
            <>
              <Route path="/all-transactions" element={<Transaction />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/user/:id" element={<UserDetails />} />
            </>
          )}

          {role === "user" && (
            <>
              <Route path="/payments" element={<Payments />} />
              <Route path="/purchase-token" element={<PurchaseToken />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/kyc" element={<Kyc />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
