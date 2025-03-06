const express = require("express");
const {
  register,
  verification,
  resendCode,
  login,
  logout,
  getMe,
  recoverPasswordReset,
  recoverPassword,
  recoverPasswordEmailVerification,
  recoverPasswordResendCode,
} = require("../controllers/auth.controllers");
const {
  emailValidation,
  recoverPasswordEmailValidation,
  authValidation,
  hookUserCache,
  hookAccessEmailCache,
  hookRefreshEmailCache,
} = require("../middleware/tokenValidation");

const router = express.Router();

router.post("/register", register)
router.post("/verification", emailValidation, verification)
router.post("/resendCode", hookUserCache, resendCode)
router.post("/login", login)
router.post("/logout", logout)
router.get("/getMe", authValidation, getMe)
router.post("/recover_password", recoverPassword)
router.post("/recover_password/email_verification", recoverPasswordEmailValidation, recoverPasswordEmailVerification)
router.post("/recover_password/resend_code", hookAccessEmailCache, recoverPasswordResendCode)
router.put("/recover_password/reset", hookRefreshEmailCache, recoverPasswordReset)

module.exports.authRoutes = router