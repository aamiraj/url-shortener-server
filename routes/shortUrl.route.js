const express = require("express");
const router = express.Router();
const shortUrlController = require("../controllers/shortUrl.controller");

router.route("/shorten").post(shortUrlController.shorten);

module.exports = router;
