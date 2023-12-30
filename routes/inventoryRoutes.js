const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonorsListController,
  getOrganisationListForDonorController,
  getHospitalListController,
  getOrganisationForHospitalController,
  getRecentTransactionsController,
  analytics,
} = require("../controllers/inventoryController");

const router = express.Router();
 //analytics
router.get("/analytics", authMiddleware, analytics);

//Get recent transactions
router.get(
  "/get-recent-inventory",authMiddleware,  getRecentTransactionsController);

//Get all records
router.get("/get-inventory", authMiddleware, getInventoryController);

// Create Inventory
router.post("/create-inventory", authMiddleware, createInventoryController);

//Get records of donor
router.get("/get-donors", authMiddleware, getDonorsListController);

//Get records of hospital
router.get("/get-hospitals", authMiddleware, getHospitalListController);


//Get organisations for hospital
router.get("/get-organisation-for-hospital",authMiddleware,getOrganisationForHospitalController);

//Get organisations for donor
router.get("/get-organisation", authMiddleware, getOrganisationListForDonorController);

module.exports = router;
