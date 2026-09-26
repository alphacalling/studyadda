const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const { passwordResetEmail } = require("../mail/templates/passwordResetEmail");

// reset password token 
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      })
    }
    const token = crypto.randomBytes(20).toString("hex")

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    )
    console.log("DETAILS", updatedDetails)

    const frontendUrl = process.env.FRONTEND_URL || "https://studyadda.codervikas.in"
    const url = `${frontendUrl}/update-password/${token}`

    await mailSender(
      email,
      "Password Reset - StudyAdda",
      passwordResetEmail(url, user.firstName)
    )

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    })
  }
}

// reset password 
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      })
    }
    const userDetails = await User.findOne({ token: token })
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      })
    }
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      })
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    )
    res.json({
      success: true,
      message: `Password Reset Successful`,
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    })
  }
}

// Admin searches user by email before resetting
exports.adminSearchUser = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      })
    }

    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email.trim()}$`, "i") },
    }).select("firstName lastName email accountType createdAt image approved active mustChangePassword")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No user found with email: ${email}`,
      })
    }

    return res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error("Error in adminSearchUser:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to search user",
      error: error.message,
    })
  }
}

// Admin generates / sets a temporary password for a user
exports.adminSetTempPassword = async (req, res) => {
  try {
    const { email, customPassword } = req.body
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "User email is required",
      })
    }

    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email.trim()}$`, "i") },
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No registered user found with email: ${email}`,
      })
    }

    // Determine temporary password
    const tempPassword =
      customPassword && customPassword.trim().length >= 6
        ? customPassword.trim()
        : `Temp@${crypto.randomBytes(3).toString("hex").toUpperCase()}`

    // Hash the temporary password
    const encryptedPassword = await bcrypt.hash(tempPassword, 10)

    // Update user document with mustChangePassword flag
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        password: encryptedPassword,
        mustChangePassword: true,
        token: undefined,
        resetPasswordExpires: undefined,
      },
      { new: true }
    )

    // Send email with temporary password
    const frontendUrl = process.env.FRONTEND_URL || "https://studyadda.codervikas.in"
    const loginUrl = `${frontendUrl}/login`
    let emailSent = false

    try {
      const { tempPasswordEmail } = require("../mail/templates/tempPasswordEmail")
      await mailSender(
        user.email,
        "Temporary Password Assigned - StudyAdda",
        tempPasswordEmail(tempPassword, user.firstName, loginUrl)
      )
      emailSent = true
    } catch (mailError) {
      console.error("Failed to send temp password email:", mailError.message)
    }

    return res.status(200).json({
      success: true,
      message: emailSent
        ? "Temporary password generated and emailed to user."
        : "Temporary password generated successfully. User can now log in.",
      tempPassword,
      emailSent,
      user: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        accountType: updatedUser.accountType,
        mustChangePassword: updatedUser.mustChangePassword,
      },
    })
  } catch (error) {
    console.error("Error in adminSetTempPassword:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to generate temporary password",
      error: error.message,
    })
  }
}

