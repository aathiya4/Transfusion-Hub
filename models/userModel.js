const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true],
      enum: ["admin", "organisation", "donor", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "user" || this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") {
          return true;
        }
        return false;
      },
    },
    organisationName: {
      type: String,
      required: function () {
        if (this.role === "organisation") {
          return true;
        }
        return false;
      },
    },
    password: {
      type: String,
      required: [true],
    },
    email: {
      type: String,
      required: [true],
      unique: true,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true],
    },
    phone: {
      type: String,
      required: [true],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("usersModel", userSchema);
