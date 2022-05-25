const express = require("express");
const auth = require("../middlewares/auth");
const adminController = require("../controllers/admin");
const isAdmin = require("../middlewares/isAdmin")

const router = express.Router();

router.post("/approveKyc", auth, isAdmin , adminController.approveKyc);
router.post("/disApproveKyc", auth, isAdmin , adminController.disApproveKyc);
router.get("/getAllUser" , auth , isAdmin , adminController.getAllUsers);
router.get("/getAdminDashboard" , auth , isAdmin , adminController.adminDashboard);
router.post("/kycDetails" , auth , isAdmin , adminController.userKycDetails);




module.exports = router;
