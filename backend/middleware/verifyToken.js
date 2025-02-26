const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/auth.model");

const verifyEmail = async (req, res, next) => {
  try {
    const emailCodeToken = req.cookies.email_code_token
    const userToken = req.cookies.user_token
    if(!userToken) {
      return res.status(403).json({error: "Уважаемый пользователь, время выполнения проверки вашего кода превысило установленный лимит в 3 минуты. В целях безопасности, пожалуйста, повторите попытку регистрации."})
    }
    if (!emailCodeToken) {
      return res.status(403).json({error: "Время действия кода истек, отправьте код повторно", toastify: "error"})
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

const hookUserToken = (req, res, next) => {
  try {
    const userToken = req.cookies.user_token
    if(!userToken) {
      return res.status(403).json({error: "Уважаемый пользователь, время выполнения проверки вашего кода превысило установленный лимит в 3 минуты. В целях безопасности, пожалуйста, повторите попытку регистрации."})
    }

    const decodedUserToken = jwt.verify(userToken, process.env.JWT_TOKEN_SECRET)
    req.user = decodedUserToken.payload;
    next();
  }catch (error) {
    console.log("Error in hookUserToken", error.message)
    res.status(400).json({error: "Invalid hookUserToken"})
  }
}

const verifyAuth = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token
    if (!token) {
      return res.status(404).json({error: "Токен не найден, auth_token error"})
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

    req.userId = await UserModel.findById(decoded.id)
    next();
  } catch (error) {
    console.log("Error in verifyAuth", error.message)
    res.status(400).json({error: "Invalid email-key token"})
  }
}

module.exports = {verifyEmail, verifyAuth, hookUserToken}