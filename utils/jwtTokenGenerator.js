const jwt = require("jsonwebtoken");

exports.tokenGenerator = (userData) => {
  const payload = {
    email: userData.email,
    role: userData.role,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
  return token;
};
