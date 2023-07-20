const {
  createUserService,
  findUserInDatabaseService,
  findUserByTokenService,
} = require("../services/user.service");
const { tokenGenerator } = require("../utils/jwtTokenGenerator");

exports.signUpUser = async (req, res) => {
  try {
    const result = await createUserService(req);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Failed to create user.",
      error: error.message,
    });
  }
};

exports.signInUser = async (req, res) => {
  try {
    const user = req.body;
    const { email, password } = user;
    if (!email || !password) {
      return res.status(401).json({
        status: "failed",
        message: "You have not provided email or password.",
      });
    }

    const { user: userData, isPasswordValid } = await findUserInDatabaseService(
      user
    );

    if (!userData) {
      return res.status(401).json({
        status: "failed",
        message: "User does not exist.",
      });
    }

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "failed",
        message: "Password not valid.",
      });
    }

    const generatedToken = tokenGenerator(userData);

    const { password: pwd, ...others } = userData.toObject();

    const result = { ...others, token: generatedToken };

    res.status(200).json({
      status: "succeed",
      message: "User sign in seccessfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to sign in user.",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const {user: userData} = await findUserInDatabaseService({
      email: req?.user?.email,
    });

    if (!userData) {
      return res.status(401).json({
        status: "failed",
        message: "Please provide a valid email and password.",
      });
    }

    const { password, ...others } = userData.toObject();

    res.status(200).json({
      status: "succeed",
      message: "User persisted seccessfully.",
      data: { ...others },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "User not logged in.",
      error: error.message,
    });
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const result = await findUserByTokenService(req?.params?.token);

    if (!result) {
      return res.status(400).json({
        status: "failed",
        message: "Something is wrong.",
      });
    }

    const isExpired = new Date() > new Date(result?.tokenExpiresAt);
    if (isExpired) {
      return res.status(400).json({
        status: "failed",
        message: "Token Expired.",
      });
    }

    result.status = "active";
    result.confirmationToken = undefined;
    result.tokenExpiresAt = undefined;

    await result.save({ validationBeforeSave: false });

    res.status(200).json({
      status: "succeed",
      message: "User confirmed seccessfully.",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Something is wrong.",
      data: error.message,
    });
  }
};
