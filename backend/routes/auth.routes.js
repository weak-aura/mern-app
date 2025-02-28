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
  emailValidate,
  recoverPasswordEmailValidation,
  verifyAuth,
  userCacheHook,
  hookAccessEmailCache,
  hookRefreshEmailCache, 
} = require("../middleware/tokenValidation");

const router = express.Router();

router.post("/register", register)
router.post("/verification", emailValidate, verification)
router.post("/resendCode", userCacheHook, resendCode)
router.post("/login", login)
router.post("/logout", logout)
router.get("/getMe", verifyAuth, getMe)
router.post("/recover_password", recoverPassword)
router.post("/recover_password/email_verification", recoverPasswordEmailValidation, recoverPasswordEmailVerification)
router.post("/recover_password/resend_code",hookAccessEmailCache, recoverPasswordResendCode)
router.put("/recover_password/reset",hookRefreshEmailCache, recoverPasswordReset)

module.exports.authRoutes = router