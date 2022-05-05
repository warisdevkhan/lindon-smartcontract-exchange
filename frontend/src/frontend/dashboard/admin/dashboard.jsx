import React, { useEffect } from "react";
import AOS from "aos";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import BlueCer from "./assets/images/blue-cer.png";
import Yellow from "./assets/images/yellow.png";
import Green from "./assets/images/green.png";

export default function Dashboard() {
    useEffect(() => {
        document.title = "Admin :: Dashboard";
        document.body.classList.add('menu-open');
    }, [])

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
                                            <div className="dashboard-box first-box d-flex align-items-center">
                                                <div className="img-left">
                                                    <img src={BlueCer} />
                                                </div>
                                                <div className="text-left">
                                                    <h2>50</h2>
                                                    <h3>New Customers</h3>
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

                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="table-sec">
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