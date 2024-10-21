const User = require("../models/user");
const Capsule = require("../models/capsule");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render("register", {
        errorMessage: "Username already taken.",
      });
    }

    const user = new User({ username, password });
    await user.save();

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.render("register", {
      errorMessage: "An error during registration.",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user._id;
      req.session.user = user;
      return res.redirect("/dashboard");
    }

    return res.render("login", {
      errorMessage: "Incorrect Username or Password",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.render("login", {
      errorMessage: "An error during login.",
    });
  }
};

exports.dashboard = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect("/login");
  }

  try {
    const createdCapsules = await Capsule.find({ owner: userId });
    const participatingCapsules = await Capsule.find({ participants: userId });

    res.render("dashboard", {
      user: req.session.user,
      createdCapsules,
      participatingCapsules,
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading dashboard.");
  }
};
