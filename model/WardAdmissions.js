// Importing mongoose package
const mongoose = require("mongoose");

// Defining ward admissions schema
const wardSchema = new mongoose.Schema({
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
  ward: {
    type: String,
    required: true,
  },
  initial_temperature: {
    type: Number,
    required: true,
  },
  initial_blood_pressure: {
    type: Number,
    required: true,
  },
  initial_pulse_rate: {
    type: Number,
    required: true,
  },
  admitted_by: {
    type: String,
    required: true,
  },
});

// Exporting schema
module.exports = mongoose.model("WardAdmissions", wardSchema);
