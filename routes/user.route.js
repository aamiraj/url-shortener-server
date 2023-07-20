const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.route("/sign-up").post(userController.signUpUser);
router.route("/sign-in").post(userController.signInUser);
router.route("/me").get(verifyToken, userController.getMe);
router.route("/sign-up/confirmation/:token").get(userController.confirmEmail);

module.exports = router;
