const express = require("express");
const { registerUser, getAlluser, updateUser, deleteUser } = require("../Controller/userController");
const router = express.Router();


router.route("/").get(getAlluser);
router.route("/reg-user").post(registerUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

module.exports = router;