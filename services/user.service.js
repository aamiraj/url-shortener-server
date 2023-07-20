const User = require("../models/User");
const { sendEmailWithGmail } = require("../utils/mail");

exports.createUserService = async (reqObject) => {
  // const result = await User.create(userData);
  const user = new User(reqObject.body);
  user.confirmationTokenGenerator();
  const confirmationURL = `${reqObject.protocol}://${reqObject.get("host")}${
    reqObject.originalUrl
  }/confirmation/${user.confirmationToken}`;
  const emailInfo = await sendEmailWithGmail(user.email, confirmationURL);
  //console.log(emailInfo);
  if (emailInfo.accepted.length > 0) {
    const result = await user.save();
    return {
      status: "succeed",
      message: "User created seccessfully.",
      data: result,
    };
  }
  return {
    status: "failed",
    message: "Sorry, a problem occured with your account, try again later.",
  };
};

exports.findUserInDatabaseService = async (userObject) => {
  const user = await User.findOne({ email: userObject.email });
  let isPasswordValid;
  if (userObject?.password) {
    isPasswordValid = user.userPasswordValidation(userObject.password, user.password);
  }
  return { user, isPasswordValid };
};
exports.findUserByTokenService = async (token) => {
  const result = await User.findOne({ confirmationToken: token });
  return result;
};
