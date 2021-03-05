// Importing mongoose package
const mongoose = require("mongoose");

// Defining patient schema
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  patient_age: {
    type: String,
    required: true,
    max: 3,
  },
  patient_contact_no: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  patient_disease: {
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
module.exports = mongoose.model("Patient", patientSchema);
