const express = require("express");
const router = express.Router();
const capsuleController = require("../controllers/capsuleController");

// 创建时间胶囊的路由
router.get("/capsules/create", (req, res) => res.render("createCapsule.ejs"));
router.post("/capsules/create", capsuleController.createCapsule);

// 查看、编辑和删除时间胶囊的路由
router.get("/capsules/:id", capsuleController.viewCapsule);
router.get("/capsules/:id/edit", capsuleController.getEditCapsule);
router.post("/capsules/:id/edit", capsuleController.editCapsule);
router.post("/capsules/:id/delete", capsuleController.deleteCapsule);

// 邀请参与者的路由
router.post("/capsules/:id/invite", capsuleController.inviteSingleParticipant);

// 删除选中的参与者的路由
router.post(
  "/capsules/:id/deleteSelectedParticipants",
  capsuleController.deleteSelectedParticipants
);

module.exports = router;
