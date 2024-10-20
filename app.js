const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("homepage");
});

const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

const capsuleRoutes = require("./routes/capsuleRoutes");
app.use("/", capsuleRoutes);

app.listen(3000, () => {
  console.log("run on port 3000");
});
