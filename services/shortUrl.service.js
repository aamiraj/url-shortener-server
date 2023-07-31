const ShortUrl = require("../models/ShortUrl");
const { urlAlphabet, customAlphabet } = require("nanoid");

exports.shortenService = async (data) => {
  const short = customAlphabet(urlAlphabet, 10)();
  const newData = { ...data, short };
  const newShortenUrl = new ShortUrl(newData);
  const result = await newShortenUrl.save();
  return {
    status: "succeed",
    message: "Data insertion successful.",
    data: result,
  };
};

exports.findShortUrlService = async (id) => {
  const result = await ShortUrl.findOne({short: id})
  return {
    status: "succeed",
    message: "Data insertion successful.",
    data: result,
  };
};
