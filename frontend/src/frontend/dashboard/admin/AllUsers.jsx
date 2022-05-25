import React, { useState , useEffect } from "react";
import UsersTable from "./components/UsersTable";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import axios from "axios";
import { API_URL } from "../../../Config";

const AllUsers = () => {

  const [allusers , setAllUsers] = useState([])  
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("role");

  console.log('allusers====',allusers);


  const getAllUsers = () => {
    try {
      var config = {
        method: "get",
        url: `${API_URL}/admin/getAllUser`,
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      axios(config)
        .then(function (response) {
        //   console.log(JSON.stringify(response.data));
          setAllUsers(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    role === "admin" && getAllUsers();
  }, []);

  return (
    <div className="main-wrap">
      <DashboardHeader />
      <div className="dashboard-wraper">
        <Sidebar active="allusers" />
        <div className="content-wrap">
          <div className="dashboard-content p">
            <div className="dash-body-blk">
              <div className="dash-report-blk px-xl-4 px-2 pt-2">
                <div className="row">
                  <div className="col-md-12">
                    <UsersTable users={allusers}/>
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
};

export default AllUsers;
