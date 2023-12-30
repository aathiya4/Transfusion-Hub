const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");


//analytics route
const analytics = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        
        const availableBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

   
        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );

    return res.status(200).send({
      success: true,
      message: "Analytics fetched successfully",
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In fetching analytics",
      error,
    });
  }
};


//Get all records
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        $or: [
          { donor: req.body.userId },
          { organisation: req.body.userId },
          { hospital: req.body.userId },
        ],
      })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "All records fetched ",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching records",
      error,
    });
  }
};


//Create inventory
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    

    if (req.body.inventoryType == "out") {
      const reqdgroup = req.body.bloodGroup;
      const reqdQty = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      
      const reqdBloodInAmt = await inventoryModel.aggregate([
        {
          $match: {inventoryType: "in",bloodGroup: reqdgroup,},
        },
        {
          $group: {_id: "$bloodGroup",total: { $sum: "$quantity" },},
        },
      ]);
     
      const totalIn = reqdBloodInAmt[0]?.total || 0;
    
      const reqdBloodOutAmt = await inventoryModel.aggregate([
        {
          $match: {
            inventoryType: "out",
            bloodGroup: reqdgroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = reqdBloodOutAmt[0]?.total || 0;

  
      const availableBloodgrpAmt = totalIn - totalOut;
    
      if (availableBloodgrpAmt <reqdQty) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableBloodgrpAmt}ML of ${reqdgroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donor = user?._id;
    }

    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Record Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Creating record",
      error,
    });
  }
};



//Get hospitals list
const getHospitalListController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const hospitalId = await inventoryModel.distinct("hospital", {organisation});
    const hospitals = await userModel.find({ _id: { $in: hospitalId },});
    return res.status(200).send({
      success: true,
      message: "Hospitals list Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching hospitals list",
      error,
    });
  }
};

// Get donors list
const getDonorsListController = async (req, res) => {
  try {
    const organisation = req.body.userId;
  
    const donorId = await inventoryModel.distinct("donor", {organisation});
 
    const donors = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donor list fetched successfully",
      donors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching donors list",
      error,
    });
  }
};



// get organisations list for donor
const getOrganisationListForDonorController = async (req, res) => {
  try {
    const donor = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donor });
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Organisations list Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching organisations list",
      error,
    });
  }
};


//get organisation list for hospital
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospitalid = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospitalid });
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "organisations for hospital fetched",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching organisations for hospital",
      error,
    });
  }
};


// Get recent transactions
const getRecentTransactionsController = async (req, res) => {
  try {
   
    const inventory = await inventoryModel
      .find({
        $or: [
          { donor: req.body.userId },
          { organisation: req.body.userId },
          { hospital: req.body.userId },
        ],
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Recent transactions data fetched successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching recent transactions data",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getHospitalListController,
  getDonorsListController,
  getOrganisationListForDonorController,
  getOrganisationForHospitalController,
  getRecentTransactionsController,
 analytics
};
