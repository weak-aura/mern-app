const express = require("express");
const {register,verification,resendCode, login, logout, getme} = require("../controllers/auth.controllers");
const {verifyEmail, verifyAuth, hookUserToken} = require("../middleware/verifyToken");

const router = express.Router();

router.post("/register", register)
router.post("/verification", verifyEmail, verification)
router.post("/resendcode",hookUserToken, resendCode)
router.post("/login", login)
router.post("/logout", logout)
router.get("/getme",verifyAuth, getme)

module.exports.authRoutes = router