// Importing packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Initializing environment variables
dotenv.config();

// Connecting to MongoDB and displaying message in console
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to MongoDB cluster")
);

// Importing API routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");

// Middlewares
app.use(express.json()); 

// Routing middlewares
app.use("/api/user", authRoutes);
app.use("/api/dashboard", verifyToken, dashboardRoutes);

// Starting server on port 3000
app.listen(3000, () => console.log("Server is running!"));
