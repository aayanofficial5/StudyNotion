const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { resetPasswordLink } = require("../Templates/Mails/resetPasswordLink");
const User = require("../Models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { passwordUpdated } = require("../Templates/Mails/passwordUpdated");
const crypto = require("crypto");
const validator = require("validator");
exports.resetToken = async (req, res) => {
  try {
    const { email } = req.body;
    // validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required,please try again",
      });
    }

    // check for user in DB using email && give professional message
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account registered with this email",
      });
    }

    if (user?.googleId) {
      return res.status(400).json({
        success: false,
        message:
          "Your account is linked with Google. Please sign in using Google instead of resetting a password.",
      });
    }

    // check if token is already generated
    if(user.resetPasswordExpires>Date.now()){
      return res.status(400).json({
        success: false,
        message: "Link already sent check your email or retry after 5 minutes",
      });
    }

    // generate a token with crypto
    const token = crypto.randomBytes(32).toString("hex");
    // console.log("Token:", token);

    // store token in DB by hashing it
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    try {
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.log("Error occurred while storing token in DB");
    }

    // create a reset password link (client's route + token as a parameter)
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // send this link attached to mail
    await mailSender(
      email,
      "Password Reset Link",
      resetPasswordLink(user.firstName, resetLink)
    );

    // send response of email sent successfully
    res.status(200).json({
      success: true,
      message:
        "Email sent successfully to continue further check your email",
    });
  } catch (error) {
    console.log("Error occurred while sending reset password link to Email");
    res.status(500).json({
      success: true,
      message: "Error occurred while sending reset password link to Email",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // fetch data from req body
    const { token, password, confirmPassword } = req.body; // frontend puts the token from its url to api body

    // validation of data
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }

    // confirm passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords does not match",
      });
    }
    // check if password is at least 8 characters long & is strong
    if(password.length<8){
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    if(!validator.isStrongPassword(password))
    {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }
    // check if token is valid
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    // console.log("Hashed Token:", hashedToken);
        

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token Invalid or Expired.",
      });
    }

    // hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // find user in DB and update password
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // send a mail to user to inform of password updation
    await mailSender(
      user.email,
      "Password Reset Successful",
      passwordUpdated(user.email, user.firstName)
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Password Reset Successful",
    });
  } catch (error) {
    console.log("Error occurred while updating the Password : "+error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the Password : "+error,
    });
  }
};
