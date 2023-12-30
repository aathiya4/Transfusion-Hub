const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    email: {
      type: String,
      required: [true],
    },
    quantity: {
      type: Number,
      required: [true],
    },
    
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersModel",
      required: [true],
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersModel",
      required: function () {
        return this.inventoryType === "in";
      },
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersModel",
      required: function () {
        return this.inventoryType === "out";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
