const express = require("express")
const router = express.Router()

const {
  login,
  signup,
  sendotp,
  changePassword,
  forceChangePassword,
} = require("../controllers/Auth")

const {
  resetPasswordToken,
  resetPassword,
  adminSearchUser,
  adminSetTempPassword,
} = require("../controllers/ResetPassword")

const { auth, isAdmin } = require("../middleware/auth")

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// Route for forced password change when user has a temporary password
router.post("/force-change-password", auth, forceChangePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// ********************************************************************************************************
//                                      Admin Password Management
// ********************************************************************************************************

// Admin searches user by email
router.post("/admin/search-user", auth, isAdmin, adminSearchUser)

// Admin sets temporary password for a student or instructor
router.post("/admin/set-temp-password", auth, isAdmin, adminSetTempPassword)


module.exports = router
