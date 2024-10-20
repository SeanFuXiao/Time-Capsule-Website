const Capsule = require("../models/capsule");

exports.createCapsule = async (req, res) => {
  const { title, content, unlockDate } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(400).send("User is not logged in.");
  }

  const capsule = new Capsule({
    title,
    content,
    unlockDate,
    owner: userId,
  });
  await capsule.save();
  res.redirect("/dashboard");
};

exports.viewCapsule = async (req, res) => {
  const capsule = await Capsule.findById(req.params.id).populate("owner");
  res.render("viewCapsule", { capsule });
};

exports.getEditCapsule = async (req, res) => {
  const capsule = await Capsule.findById(req.params.id);
  if (!capsule) {
    return res.status(404).send("Capsule not found.");
  }
  res.render("editCapsule", { capsule });
};

exports.editCapsule = async (req, res) => {
  const capsule = await Capsule.findById(req.params.id);
  capsule.title = req.body.title;
  capsule.content = req.body.content;
  capsule.unlockDate = req.body.unlockDate;
  await capsule.save();
  res.redirect("/dashboard");
};

exports.deleteCapsule = async (req, res) => {
  await Capsule.findByIdAndDelete(req.params.id);
  res.redirect("/dashboard");
};
