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
      required: [true, "Please provide a valid short link."],
      unique: [true, "Short link should be unique."],
      validate: {
        validator: function (str) {
          if (str.length === 10) {
            return true;
          }
          return false;
        },
        message: "Short link should be length 10.",
      },
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: [true, "User id is required."],
      validate: {
        validator: function (obj) {
          const str = obj.toString();
          if (str.length === 24) {
            return true;
          }
          return false;
        },
        message: "User id should be length 24.",
      },
    },
  },
  { timestamps: true }
);

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

module.exports = ShortUrl;
