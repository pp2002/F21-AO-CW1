// Importing packages
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Importing user schema
const User = require("../model/User");

// Importing validation functions
const { registrationValidation, loginValidation, patientValidation, wardAdminValidation } = require("../validation");

// User Registration endpoint
router.post("/register", async (req, res) => {
  
  const { error } = registrationValidation(req.body);

  
  if (error) return res.status(400).json({ error: error.details[0].message }); // Displaying appropriate error message

  const isEmailExist = await User.findOne({ email: req.body.email });

  // If email exists, error thrown
  if (isEmailExist)
    return res.status(400).json({ error: "Email already exists" });

  // Encrypting password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  // User schema assigned values
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password,
    designation: req.body.designation,
    department: req.body.department,
  });

  // Saving user
  try {
    const savedUser = await user.save();
    res.status(200).json({ error: null, data: { userId: savedUser._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// User login endpoint
router.post("/login", async (req, res) => {
  
  const { error } = loginValidation(req.body);

  // Displaying appropriate error message
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });

  
  if (!user) return res.status(400).json({ error: "Incorrect email" });

  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Incorrect password" });

  // Adding payload to token
  const token = jwt.sign(
    {
      name: user.name,
      designation: user.designation,
      department: user.department,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  // Passing token as header to perform functions after logging in
  res.header("auth-token", token).json({
    error: null,
    data: {
      token,
    },
  });
});

router.post("/del", async(req,res) => {

  try {
    const deletedUser = await User.deleteOne({email: "rahulsgd12345@gmail.com"});
    res.status(200).json({ error: null});
  } catch (error) {
    res.status(400).json({ error });
  }
})

// Exporting module
module.exports = router;
