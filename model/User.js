// Importing mongoose package
const mongoose = require("mongoose");


// Defining user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  designation: {
    type: String,
    required: true,
    min: 5,
  },
  department: {
    type: String,
    required: true,
  },
});

// Exporting schema
module.exports = mongoose.model("User", userSchema);
