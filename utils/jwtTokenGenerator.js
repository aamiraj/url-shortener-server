const jwt = require("jsonwebtoken");

exports.tokenGenerator = (userData) => {
  const payload = {
    user_id: userData._id,
    role: userData.role,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
  return token;
};
