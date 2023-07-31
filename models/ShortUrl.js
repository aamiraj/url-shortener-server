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
          if(str.length === 10){
            return true
          }
          return false
        },
        message: "Short link should be length 10.",
      },
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
