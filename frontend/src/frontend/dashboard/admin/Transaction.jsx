import React, { useEffect } from "react";
import AOS from "aos";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import QRCode from "./assets/images/qrcode.png";

export default function Transaction() {
    useEffect(() => {
        document.title = "Admin :: Dashboard"
        document.body.classList.add('menu-open');
    }, [])
    return (
        <div className="main-wrap">
            <DashboardHeader />
            <div className="dashboard-wraper">
                <Sidebar active={"transaction"} />
                <div className="content-wrap">
                    <div className="dashboard-content p">
                        <div className="dash-body-blk">
                            <div className="dash-report-blk px-xl-4 px-2 pt-2">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-sec">
                                            <table className="table">
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