const nodemailer = require("nodemailer");
const HTML_TEMPLATE = require("../template");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports.sendEmailWithGmail = async (receiverEmail, confirmationURL) => {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_GMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const message = `This message is sent to verify its you. Please confirm your email: ${confirmationURL}`;
  const subject = "Verify your email.";

  const mailData = {
    from: process.env.SENDER_GMAIL,
    to: receiverEmail,
    subject: subject,
    text: message,
    html: HTML_TEMPLATE(message),
  };

  let info = await transporter.sendMail(mailData);

  return info;
};
