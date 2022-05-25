import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { API_URL } from "../../../Config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserDetails = () => {
  const [kycData, setKycData] = useState(null);

  console.log("kycData", kycData);

  const name = kycData?.userDetails?.name;
  const address = kycData?.userDetails?.address;
  const city = kycData?.userDetails?.city;
  const country = kycData?.userDetails?.country;
  const passport = kycData?.userDetails?.passport;
  const idCard = kycData?.userDetails?.idCard;

  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("role");

  const param = useParams();

  const userKycDetails = () => {
    try {
      var data = param.id;
      var config = {
        method: "post",
        url: `${API_URL}/admin/kycDetails`,
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { id: data },
      };

      axios(config)
        .then(function (response) {
          //   console.log(JSON.stringify(response.data));
          setKycData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const approveKyc = () => {
    try {
      var data = param.id;
      var config = {
        method: "post",
        url: `${API_URL}/admin/approveKyc`,
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { id: data },
      };

      axios(config)
        .then(function (response) {
          //   console.log(JSON.stringify(response.data));
          toast.success(response?.data?.msg);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const disApproveKyc = () => {
    try {
      var data = param.id;
      var config = {
        method: "post",
        url: `${API_URL}/admin/disApproveKyc`,
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { id: data },
      };

      axios(config)
        .then(function (response) {
          //   console.log(JSON.stringify(response.data));
          toast.success(response?.data?.msg);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    role === "admin" && userKycDetails();
  }, []);

  return (
    <div className="main-wrap">
      <DashboardHeader />
      <div className="dashboard-wraper">
        <Sidebar />
        <div className="content-wrap">
          <div className="dashboard-content p">
            <div className="dash-body-blk">
              <div className="dash-report-blk px-xl-4 px-2 pt-2">
                <div className="row">
                  <div className="col-md-12">
                    {kycData?.userDetails !== null ? (
                      <div>
                        <div className="approvalSection">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => approveKyc()}
                          >
                            Approved
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => disApproveKyc()}
                          >
                            Reject
                          </Button>
                        </div>
                        <Accordion
                          style={{ backgroundColor: "#131415" }}
                          sx={{ m: 2 }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ color: "#fafafa" }} />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography
                              className="Accordian-heading"
                              style={{ color: "white" }}
                            >
                              User Personal Information
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div>
                              <p>name : {name}</p>
                              <p>address : {address}</p>
                              <p>Country : {country}</p>
                              <p>City : {city}</p>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion
                          style={{ backgroundColor: "#131415" }}
                          sx={{ m: 2 }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ color: "#fafafa" }} />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography
                              className="Accordian-heading"
                              style={{ color: "white" }}
                            >
                              User Personal Documents
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div>
                              <p>Passport Image</p>
                              <img src={passport} alt="" />
                              <p>Id Card Image</p>
                              <img src={idCard} alt="" />
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ) : (
                      <div>
                        <p>NO DATA FOUND</p>
                      </div>
                    )}
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

export default UserDetails;
