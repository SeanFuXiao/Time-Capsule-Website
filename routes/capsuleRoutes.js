const express = require("express");
const router = express.Router();
const capsuleController = require("../controllers/capsuleController");

router.get("/capsules/create", (req, res) => res.render("createCapsule.ejs"));
router.post("/capsules/create", capsuleController.createCapsule);

router.get("/capsules/:id", capsuleController.viewCapsule);
router.get("/capsules/:id/edit", capsuleController.getEditCapsule);
router.post("/capsules/:id/edit", capsuleController.editCapsule);
router.post("/capsules/:id/delete", capsuleController.deleteCapsule);

router.post("/capsules/:id/invite", capsuleController.inviteSingleParticipant);

router.post(
  "/capsules/:id/deleteSelectedParticipants",
  capsuleController.deleteSelectedParticipants
);

router.post("/capsules/:id/comments", capsuleController.addComment);
module.exports = router;
