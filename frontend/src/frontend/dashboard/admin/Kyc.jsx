import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { API_URL } from "../../../Config";
import axios from "axios";
import { toast } from "react-toastify";


const Kyc = () => {

  const token = localStorage.getItem("userToken");
  const userKycStatus = localStorage.getItem("userKycStatus")

  const [firstTab, setFirstTab] = useState(true);
  const [secTab, setSecTab] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    country: "",
    city: "",
  });

  const [passport, setPassport] = useState("");
  const [idCard, setIdCard] = useState("");

  useEffect(() => {
    document.title = "Admin :: Dashboard";
    // document.body.classList.add("menu-open");
  }, []);

  function changeColor(effect) {
    if (effect == "bin")
      document.getElementById("bitpay-button").style.color = "#F1B820";
    else if (effect == "bout")
      document.getElementById("bitpay-button").style.color = "#212529";
    else if (effect == "in")
      document.getElementById("stripe-button").style.color = "#F1B820";
    else document.getElementById("stripe-button").style.color = "#212529";
  }

  function handleTab(number) {
    if (number == "sec") {
      if (!userInfo.name) {
      toast.warn("Please enter Name");
      } else if (!userInfo.address) {
        toast.warn("Please enter Address");
      } else if (!userInfo.country) {
        toast.warn("Please enter Country");
      } else if (!userInfo.city) {
        toast.warn("Please enter City");
      } else {
        setFirstTab(!firstTab);
        setSecTab(!secTab);
      }
    }
    if (number == "s-back") {
      setSecTab(!firstTab)
    } 
  }

  const handleChange = ({ target: { name, value } }) => {
    console.log("value", value);
    let temp = { ...userInfo };
    temp[name] = value;
    setUserInfo(temp);
  };

  const onPassportChange = (event) => {
    setPassport(event.target.files[0]);
  };

  const onIdCardChange = (event) => {
    setIdCard(event.target.files[0]);
  };

  const handleSave = () => {
    if (passport.length < 1) {
      toast.warn("Please enter passport");
    } else if (idCard.length < 1) {
      toast.warn("Please enter id Card");
    } else {
      try {
        var data = new FormData();
        data.append("name", userInfo.name);
        data.append("address", userInfo.address);
        data.append("country", userInfo.country);
        data.append("city", userInfo.city);
        data.append("passport", passport);
        data.append("idCard", idCard);

        for (var pair of data.entries()) {
          console.log("formdata===", pair[0] + ", " + pair[1]);
        }

        var config = {
          method: "post",
          url: `${API_URL}/kyc/createKyc`,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.data.msg === "Kyc Already Created") {
              toast.warn(response.data.msg);
            } else {
              toast.success(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <>
      <div className="main-wrap">
        <DashboardHeader />
        <div className="dashboard-wraper">
          <Sidebar active="kyc" />
          <div className="content-wrap">
            <div className="dashboard-content p">
              <div className="dash-body-blk">
                <div className="dash-report-blk px-xl-4 px-2 pt-2">
                  <div className="row">
                    <div className="col-md-12">

                      {
                      userKycStatus !== "Pending For Approval" && 
                      userKycStatus !== "Success" ?
                      <div className="payment-box-top">
                        <div className="admin-tabs-box">
                          <ul className="nav nav-tabs">
                            <li className="">
                              <a className={firstTab ? "active" : undefined}>
                                <span className="count">1</span>{" "}
                                <span>Personal Details</span>
                              </a>
                            </li>
                            <li>
                              <a className={secTab ? "active" : undefined}>
                                <span className="count">2</span>{" "}
                                <span>Personal Documents</span>
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content">
                            <div
                              id="home"
                              className={
                                firstTab ? "tab-pane active" : "tab-pane fade"
                              }
                            >
                              <div className="card-btm">
                                <form>
                                  <div className="form-group">
                                    <label>Name</label>
                                    <input
                                      type="text"
                                      name="name"
                                      placeholder=""
                                      value={userInfo.name}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Address</label>
                                    <input
                                      type="text"
                                      name="address"
                                      placeholder=""
                                      value={userInfo.address}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="com-box-fifty d-flex align-items-center">
                                    <div className="form-group">
                                      <label>Country</label>
                                      <input
                                        type="text"
                                        name="country"
                                        placeholder=""
                                        value={userInfo.country}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>City</label>
                                      <input
                                        type="text"
                                        name="city"
                                        placeholder=""
                                        value={userInfo.city}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </form>
                                <div
                                  className="btn btn-full"
                                  onClick={() => handleTab("sec")}
                                >
                                  NExt
                                </div>
                              </div>
                            </div>
                            <div
                              id="menu1"
                              className={
                                secTab ? "tab-pane active" : "tab-pane fade"
                              }
                            >
                              <div className="card-btm">
                                <div className="form-group">
                                  <label>Passport</label>
                                  <input
                                    type="file"
                                    name="passport"
                                    placeholder=""
                                    onChange={(e) => onPassportChange(e)}
                                  />
                                </div>
                                <div className="form-group">
                                  <label>ID Card</label>
                                  <input
                                    type="file"
                                    name="idCard"
                                    placeholder=""
                                    onChange={(e) => onIdCardChange(e)}
                                  />
                                </div>
                                <div className="btn-both-main justify-content-center d-flex align-items-center flex-wrap">
                                  <div
                                    onClick={() => handleTab("s-back")}
                                    className="btn btn-back"
                                  >
                                    Back
                                  </div>
                                  <div
                                    className="btn btn-full"
                                    onClick={() => handleSave()}
                                  >
                                    Save
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      : 

                      <p>{userKycStatus}</p>
                      }

                    </div>
                    <div className="col-md-12">
                      <footer className="text-center copyRightMark">
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
    </>
  );
};

export default Kyc;
