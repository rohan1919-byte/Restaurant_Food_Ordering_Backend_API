const mongoose = require("mongoose");
const colors = require("colors");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connect to Database`.bgGreen);
  } catch (error) {
    console.log("DB Error", error);
  }
}
module.exports = connectDb;
