// Importing JSONwebtoken package
const jwt = require("jsonwebtoken");

// Verifying token received after login
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access denied" }); 

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" }); // Displaying error if token invalid
  }
};

// Exporting module
module.exports = verifyToken;
