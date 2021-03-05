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


// Exporting functions
module.exports = {
  registrationValidation,
  loginValidation,
};
