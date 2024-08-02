const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const PORT = 8082;

// Middleware to parse JSON requests
app.use(express.json());

// Import the user routes
const userRoutes = require("./routes/user.routes");

// Use the user routes for any requests starting with "/user"
app.use("/user", userRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/disfo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully"))
  .catch((error) => console.error("DB connection failed:", error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server Listening at PORT ${PORT}`);
});
