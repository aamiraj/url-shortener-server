const express = require("express");
const router = express.Router();
const shortUrlController = require("../controllers/shortUrl.controller");

router.route("/shorten").post(shortUrlController.shorten);
router.route("/save").post(shortUrlController.saveUrl);
router.route("/delete").delete(shortUrlController.deleteUrl);

module.exports = router;
