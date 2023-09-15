const express = require("express");
const router = express.Router();
const shortUrlController = require("../controllers/shortUrl.controller");

router.route("/getAll/:userId").get(shortUrlController.getAll);
router.route("/getOne/:id").get(shortUrlController.getOne);
router.route("/shorten").post(shortUrlController.shorten);
router.route("/save").post(shortUrlController.saveUrl);
router.route("/delete").delete(shortUrlController.deleteUrl);

module.exports = router;
