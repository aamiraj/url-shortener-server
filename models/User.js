const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//user model
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isEmail, "Provide a valid email"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowerCase: 3,
            minUpperCase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message: "Password is not strong enough.",
      },
    },
    confirmPassword: {
      type: String,
      validate: function (value) {
        return value === this.password;
      },
      message: "Password did not match",
    },
    role: {
      type: String,
      enum: ["guest", "google", "email"],
    },
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: [3, "Minimum 5 characters required."],
      maxLength: [100, "Maximum 100 characters."],
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: [3, "Minimum 5 characters required."],
      maxLength: [100, "Maximum 100 characters."],
    },
    contactNumber: [
      {
        type: String,
        validate: [
          validator.isMobilePhone,
          "Please provide a valid phone number.",
        ],
      },
    ],
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid image URL"],
    },
    passwordChangedAt: Date,
    passwordToken: String,
    passwordExpiresAt: Date,
    confirmationToken: String,
    tokenExpiresAt: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const userPass = this.password;
  const hashedPassword = bcrypt.hashSync(userPass);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.userPasswordValidation = function (
  password,
  hashedPassword
) {
  const isValid = bcrypt.compareSync(password, hashedPassword);
  return isValid;
};

userSchema.methods.confirmationTokenGenerator = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.confirmationToken = token;

  const date = new Date();
  date.setDate(date.getDate() + 1);
  this.tokenExpiresAt = date;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
