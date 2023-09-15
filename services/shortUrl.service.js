const { ObjectId } = require("mongodb");
const ShortUrl = require("../models/ShortUrl");
const { urlAlphabet, customAlphabet } = require("nanoid");

exports.shortenService = async (data) => {
  const foundLink = await ShortUrl.findOne({
    full: data.full,
    user_id: data.user_id,
  });
  if (foundLink) {
    return {
      status: "failed",
      message: "Data insertion not needed.",
      data: foundLink,
    };
  }
  const short = customAlphabet(urlAlphabet, 10)();
  let newData;
  if (!data.user_id) {
    const id = customAlphabet("1234567890abcdef", 24)();
    const user_id = new ObjectId(id);
    newData = { ...data, short, user_id };
  } else {
    newData = { ...data, short };
  }
  const newShortenUrl = new ShortUrl(newData);
  const result = await newShortenUrl.save();

  return {
    status: "succeed",
    message: "Data insertion successful.",
    data: result,
  };
};

exports.findAllService = async (id) => {
  const result = await ShortUrl.find({ user_id: new ObjectId(id) });
  return {
    status: "succeed",
    message: "Data found successful.",
    data: result,
  };
};

exports.findOneService = async (id) => {
  const result = await ShortUrl.findById(id, "full short");
  return {
    status: "succeed",
    message: "Data found successful.",
    data: result,
  };
};

exports.findShortUrlService = async (id) => {
  const result = await ShortUrl.findOne({ short: id });
  return {
    status: "succeed",
    message: "Data found successful.",
    data: result,
  };
};

exports.saveUrlService = async (data) => {
  const foundLink = await ShortUrl.findOne({
    full: data.full,
    user_id: data.user_id,
  });
  if (foundLink?.short === data.short) {
    return {
      status: "failed",
      message: "Data save not needed.",
      data: foundLink,
    };
  }
  const result = await ShortUrl.updateOne(
    {
      full: data.full,
      user_id: data.user_id,
    },
    { short: data.short }
  );
  return {
    status: "succeed",
    message: "Data saved successful.",
    data: result,
  };
};

exports.deleteUrlService = async (data) => {
  //const result = await ShortUrl.deleteOne(data);
  const result = data;
  return {
    status: "succeed",
    message: "Data deleted successful.",
    data: result,
  };
};
