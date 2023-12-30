const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
dotenv.config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Mongodb ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`Mongodb Error ${error}`);
  }
};


connectDB();

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/auth", require("./routes/authRoutes"));
app.use("/inventory", require("./routes/inventoryRoutes"));
app.use("/admin", require("./routes/adminRoutes"));


const PORT =8080;


app.listen(PORT, () => {
  console.log(
    `Listening on port ${PORT} `
      
  );
});
