const User = require("../models/user");
const Capsule = require("../models/capsule");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.send("Username already exists. Please choose another one.");
  }

  const user = new User({ username, password });
  await user.save();

  res.redirect("/login");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user._id;
    req.session.user = user;
    res.redirect("/dashboard");
  } else {
    res.send("Wrong Username or Password");
  }
};

exports.dashboard = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect("/login");
  }

  try {
    const capsules = await Capsule.find({ owner: userId });

    res.render("dashboard", { user: req.session.user, capsules });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard.");
  }
};
