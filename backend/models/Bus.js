const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  name: String,
  from: String,
  to: String,
  time: String,
  date: String,
  price: Number,
});

module.exports = mongoose.model("Bus", BusSchema);
