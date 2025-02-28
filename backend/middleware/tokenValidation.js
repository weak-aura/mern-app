const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/auth.model");

const emailValidate = async (req, res, next) => {
  try {
    const emailCodeToken = req.cookies.email_code_cache
    const userToken = req.cookies.user_cache
    if (!userToken) {
      return res.status(403).json({error: "Уважаемый пользователь, время выполнения проверки вашего кода превысило установленный лимит в 3 минуты. В целях безопасности, пожалуйста, повторите попытку регистрации."})
    }
    if (!emailCodeToken) {
      return res.status(403).json({error: "Время действия кода истек, отправьте код повторно"})
    }

    const decodedEmailCodeToken = jwt.verify(emailCodeToken, process.env.JWT_TOKEN_SECRET)
    const decodedUserToken = jwt.verify(userToken, process.env.JWT_TOKEN_SECRET)

    req.user = decodedUserToken.payload;
    req.code = decodedEmailCodeToken.payload;
    next();

  } catch (error) {
    console.log("Error in verifyEmail", error.message)
    res.status(400).json({error: "Invalid email-key token"})
  }
}

const recoverPasswordEmailValidation = async (req, res, next) => {
  try {
    const emailCodeToken = req.cookies.email_code_cache
    const accessEmailToken = req.cookies.access_email_cache

    if (!accessEmailToken) {
      return res.status(403).json({error: "Время, отведенное для проверки кода, истекло. Начните заново."})
    }

    if (!emailCodeToken) {
      return res.status(403).json({
        error: "Время действия кода истек, отправьте код повторно.",
        cookie_code: "invalid_code"
      })
    }

    const decodedEmailCodeToken = jwt.decode(emailCodeToken, process.env.JWT_TOKEN_SECRET);
    const decodedAccessEmailToken = jwt.decode(accessEmailToken, process.env.JWT_TOKEN_SECRET);

    req.code = decodedEmailCodeToken.payload;
    req.email = decodedAccessEmailToken.payload;
    next();

  } catch (error) {
    console.log("error in confirmPasswordResetEmail:", error.message)
    res.status(400).json({error: `Invalid Code or Email token`})
  }
}

const hookAccessEmailCache = (req, res, next) => {
  try {
    const accessEmailToken = req.cookies.access_email_cache
    if (!accessEmailToken) {
      return res.status(403).json({error: "Время действия сброса пароля истекло. Начните заново."})
    }

    const decodedAccessEmailToken = jwt.verify(accessEmailToken, process.env.JWT_TOKEN_SECRET)
    req.email = decodedAccessEmailToken.payload;
    next()
  } catch (error) {
    console.log("Error in hookAccessEmailCache", error.message)
    res.status(400).json({error: "Invalid Email Token"})
  }
}

const hookRefreshEmailCache = (req, res, next) => {
  try {
    const refreshEmailToken = req.cookies.refresh_email_cache
    if (!refreshEmailToken) {
      return res.status(403).json({error: "Время действия сброса пароля истекло. Начните заново."})
    }

    const decodedRefreshEmailToken = jwt.verify(refreshEmailToken, process.env.JWT_TOKEN_SECRET)
    req.email = decodedRefreshEmailToken.payload;
    next();

  } catch (error) {
    console.log("Error in hookRefreshEmailCache", error.message)
    res.status(400).json({error: "Invalid Email Token"})
  }
}

const userCacheHook = (req, res, next) => {
  try {
    const userToken = req.cookies.user_cache
    if (!userToken) {
      return res.status(403).json({error: "Уважаемый пользователь, время выполнения проверки вашего кода превысило установленный лимит в 3 минуты. В целях безопасности, пожалуйста, повторите попытку регистрации."})
    }

    const decodedUserToken = jwt.verify(userToken, process.env.JWT_TOKEN_SECRET)
    req.user = decodedUserToken.payload;
    next();
  } catch (error) {
    console.log("Error in userCacheHook", error.message)
    res.status(400).json({error: "Invalid User Token"})
  }
}

const verifyAuth = async (req, res, next) => {
  try {
    const token = req.cookies.auth_cache
    if (!token) {
      return res.status(404).json({error: "Токен не найден, auth_token error", cookie: "invalid_auth_cache"})
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

    req.userId = await UserModel.findById(decoded.id)
    next();
  } catch (error) {
    console.log("Error in verifyAuth", error.message)
    res.status(400).json({error: "Invalid Auth Token"})
  }
}

module.exports = {
  emailValidate,
  recoverPasswordEmailValidation,
  verifyAuth,
  userCacheHook,
  hookAccessEmailCache,
  hookRefreshEmailCache
}