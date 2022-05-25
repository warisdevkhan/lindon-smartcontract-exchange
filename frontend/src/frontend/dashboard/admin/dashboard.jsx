import React, { useState, useEffect } from "react";
import AOS from "aos";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import BlueCer from "./assets/images/blue-cer.png";
import Yellow from "./assets/images/yellow.png";
import Green from "./assets/images/green.png";
import Card from "./components/Card";
import axios from "axios";
import { API_URL } from "../../../Config";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("userToken");

  const [userKycDetails, setUserKycDetails] = useState("");
  const [adminDashboardData , setAdminDashboardData] = useState('')


  console.log("adminDashboardData==>",adminDashboardData);

  useEffect(() => {
    document.title = "Dashboard";
    // document.body.classList.add("menu-open");
  }, []);

  const getUserKycDetails = () => {
    try {
      var config = {
        method: "get",
        url: `${API_URL}/kyc/getKyc`,
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          localStorage.setItem(
            "userKycStatus",
            response?.data?.user?.kycStatus
          );
          setUserKycDetails(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };


  const getAdminDashboardDetails = () => {
    try {
        var config = {
          method: "get",
          url: `${API_URL}/admin/getAdminDashboard`,
          headers: {
            Authorization: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
  
        axios(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            setAdminDashboardData(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    role === "user" && getUserKycDetails();
    role === "admin" && getAdminDashboardDetails()
  }, []);

  return (
    <div className="main-wrap">
      <DashboardHeader />
      <div className="dashboard-wraper">
        <Sidebar active={"dashboard"} />
        <div className="content-wrap">
          <div className="dashboard-content p">
            <div className="dash-body-blk">
              <div className="dash-report-blk px-xl-4 px-2 pt-2">
                <div className="row">
                  <div className="col-md-12">
                    <div className="top-cer-box d-flex align-items-center flex-wrap">
                      {role === "user" && (
                        <Card
                          name={"Kyc Status"}
                          kycStatus={userKycDetails?.user?.kycStatus}
                          image={BlueCer}
                        />
                      )}

                      {role === "admin" && (
                        <>
                        <div className="dashboard-box second-box d-flex align-items-center">
                            <div className="img-left">
                              <img src={Yellow} />
                            </div>
                            <div className="text-left">
                              <h2>{adminDashboardData?.result?.totalUsers}</h2>
                              <h3>Total Users</h3>
                        </div>
                          </div>
                          <div className="dashboard-box second-box d-flex align-items-center">
                            <div className="img-left">
                              <img src={Yellow} />
                            </div>
                            <div className="text-left">
                              <h2>250</h2>
                              <h3>Transactions</h3>
                            </div>
                          </div>

                          <div className="dashboard-box third-box d-flex align-items-center">
                            <div className="img-left">
                              <img src={Green} />
                            </div>
                            <div className="text-left">
                              <h2>$ 250.00</h2>
                              <h3>Wallet Amount</h3>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12">
                    {/* <div className="table-sec">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Transactions</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"><a href="#">View all</a></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td>Derrick Hilton</td>
                                        <td>11/05/2021</td>
                                        <td>$ 250.00</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Fatimah Dupont</td>
                                        <td>11/05/2021</td>
                                        <td>$ 250.00</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Nur Gallegos</td>
                                        <td>11/05/2021</td>
                                        <td>$ 250.00</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Giacomo Bowes</td>
                                        <td>11/05/2021</td>
                                        <td>$ 250.00</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Kavita Mayer</td>
                                        <td>11/05/2021</td>
                                        <td>$ 250.00</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Tobey Evans</td>
                                        <td>11/05/2021</td>
                                        <td>$ 250.00</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Liliana Huber</td>
                                        <td>11/05/2021</td>
                                        <td>$ 250.00</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Kavita Mayer</td>
                                        <td>11/05/2021</td>
                                        <td>$ 250.00</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Tobey Evans</td>
                                        <td>11/05/2021</td>
                                        <td>$ 250.00</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Liliana Huber</td>
                                        <td>11/05/2021</td>
                                        <td>$ 250.00</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}
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
  );
}
