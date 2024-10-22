const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
// Middleware
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// Route login
// Route login
app.get("/", (req, res) => {
  res.render("login");
});
// auth routes
// auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);
// capsule routes
// caosule routes
const capsuleRoutes = require("./routes/capsuleRoutes");
app.use("/", capsuleRoutes);
// Server listens
// Server listens
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
