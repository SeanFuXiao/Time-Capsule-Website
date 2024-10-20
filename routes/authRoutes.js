const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/register", (req, res) => res.render("register.ejs"));
router.post("/register", authController.register);

router.get("/login", (req, res) => res.render("login.ejs"));
router.post("/login", authController.login);

router.get("/dashboard", authController.dashboard);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});

module.exports = router;
