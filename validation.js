// Importing validation library
const Joi = require("@hapi/joi");

// Validation function for registration
const registrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    designation: Joi.string().min(5).max(255).required(),
    department: Joi.string().required(),
  });

  return schema.validate(data);
};

// Validation function for login
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};


const patientValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    patient_age: Joi.string().max(3).required(),
    patient_contact_no: Joi.string().required(),
    patient_disease: Joi.string().min(5).required(),
  });

  return schema.validate(data);
};

const wardAdminValidation = (data) => {
  const schema = Joi.object({
    patient_contact_no: Joi.string().required(),
    ward: Joi.string().required(),
    initial_temperature: Joi.number().required(),
    initial_blood_pressure: Joi.number().required(),
    initial_pulse_rate: Joi.number().required(),
  });

  return schema.validate(data);
};


// Exporting functions
module.exports = {
  registrationValidation,
  loginValidation,
  patientValidation,
  wardAdminValidation,
};
