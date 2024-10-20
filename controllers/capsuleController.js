const Capsule = require("../models/capsule");
const User = require("../models/user");
const Comment = require("../models/comment");
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
  const capsule = await Capsule.findById(req.params.id)
    .populate("participants", "username")
    .populate("owner", "username");

  const comments = await Comment.find({ capsule: capsule._id }).populate(
    "user",
    "username"
  );

  res.render("viewCapsule", { capsule, comments, user: req.session.user });
};

exports.addComment = async (req, res) => {
  const { content } = req.body;
  const userId = req.session.userId;
  const capsuleId = req.params.id;

  const capsule = await Capsule.findById(capsuleId);

  if (new Date() < capsule.unlockDate) {
    return res
      .status(403)
      .send("You cannot comment on this capsule until it is unlocked.");
  }

  const comment = new Comment({
    content,
    capsule: capsuleId,
    user: userId,
  });

  await comment.save();
  res.redirect(`/capsules/${capsuleId}`);
};
exports.getEditCapsule = async (req, res) => {
  const capsule = await Capsule.findById(req.params.id);

  if (!capsule) {
    return res.status(404).send("Capsule not found.");
  }

  if (capsule.owner.toString() !== req.session.userId) {
    return res
      .status(403)
      .send("You do not have permission to edit this capsule.");
  }

  res.render("editCapsule", { capsule });
};

exports.editCapsule = async (req, res) => {
  const capsule = await Capsule.findById(req.params.id);

  if (capsule.owner.toString() !== req.session.userId) {
    return res
      .status(403)
      .send("You do not have permission to edit this capsule.");
  }

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

exports.inviteSingleParticipant = async (req, res) => {
  const { participant } = req.body;
  const capsuleId = req.params.id;

  const capsule = await Capsule.findById(capsuleId);
  const user = await User.findOne({ username: participant.trim() });

  if (!user) {
    return res.status(404).send("User not found.");
  }

  if (!capsule.participants.includes(user._id)) {
    capsule.participants.push(user._id);
    await capsule.save();
  }

  res.redirect(`/capsules/${capsuleId}`);
};

exports.deleteSelectedParticipants = async (req, res) => {
  const capsuleId = req.params.id;
  const { selectedParticipants } = req.body;

  if (!selectedParticipants || selectedParticipants.length === 0) {
    return res.status(400).send("No participants selected for deletion.");
  }

  const capsule = await Capsule.findById(capsuleId);

  capsule.participants = capsule.participants.filter(
    (participantId) => !selectedParticipants.includes(participantId.toString())
  );

  await capsule.save();
  res.redirect(`/capsules/${capsuleId}`);
};
