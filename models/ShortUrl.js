const mongoose = require("mongoose");

//short url model
const shortUrlSchema = mongoose.Schema(
  {
    full: {
      type: String,
      isURL: true,
      required: [true, "Please provide a valid link."],
    },
    short: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      isEmail: true,
    },
  },
  { timestamps: true }
);

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

module.exports = ShortUrl;
