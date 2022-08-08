const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  redescribeGroup,
  relocateGroup,
  redateGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat); //only the logged in users can access the chats
router.route("/").get(protect, fetchChats); //getting all the chats from the database for each user
router.route("/group").post(protect, createGroupChat); //Creating group chats (post request)
router.route("/rename").put(protect, renameGroup); //Rename the group

router.route("/redesc").put(protect, redescribeGroup); //Rename the group
router.route("/relocate").put(protect, relocateGroup); //Rename the group
router.route("/redate").put(protect, redateGroup); //Rename the group

router.route("/groupremove").put(protect, removeFromGroup); //Remove or leave
router.route("/groupadd").put(protect, addToGroup); //adding to group

module.exports = router;
