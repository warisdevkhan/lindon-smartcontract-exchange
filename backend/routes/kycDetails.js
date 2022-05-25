const express = require("express");
const auth = require("../middlewares/auth");
const kycDetailsController = require("../controllers/kycDetails");
const upload = require("../middlewares/fileUpload");
const kycDetailsMiddleware = require("../middlewares/kycDetails.middleware");

const router = express.Router();

const fileUpload = upload.fields([
  { name: "passport", maxCount: 1 },
  { name: "idCard", maxCount: 1 },
]);

router.post(
  "/createKyc",
  fileUpload,
  auth,
  kycDetailsMiddleware.validate("kycDetails"),
  kycDetailsController.createKyc
);
router.get("/getKyc", auth, kycDetailsController.getKycDetails);

module.exports = router;
