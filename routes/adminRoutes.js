const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {getDonorsListController,getHospitalListController,getOrgListController,deleteController} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();
//donors list
router.get("/donor-list",authMiddleware,adminMiddleware,getDonorsListController);

//organisations list
router.get("/org-list", authMiddleware, adminMiddleware, getOrgListController);

//hospitals list
router.get("/hospital-list",authMiddleware,adminMiddleware,getHospitalListController);


//delete
router.delete("/delete-donor/:id",authMiddleware,adminMiddleware,deleteController);


module.exports = router;
