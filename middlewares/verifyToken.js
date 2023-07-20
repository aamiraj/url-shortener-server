const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.send({ status: "failed", error: error.message });
  }
};
