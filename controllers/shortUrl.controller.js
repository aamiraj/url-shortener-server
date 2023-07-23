const { shortenService } = require("../services/shortUrl.service");

exports.shorten = async (req, res) => {
  try {
    const data = req.body;

    const result = await shortenService(data);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Failed to create a short url.",
      error: error.message,
    });
  }
};
