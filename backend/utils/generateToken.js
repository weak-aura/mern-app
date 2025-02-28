const jwt = require("jsonwebtoken");

const generateAuthToken = (id, res) => {
  const token = jwt.sign({id}, process.env.JWT_TOKEN_SECRET, {expiresIn: "1d"})
  res.cookie("auth_cache", token, {maxAge: 86400000, httpOnly: true, sameSite: "none", secure: true})
}

const generateUserToken = (payload, res) => {
  const token = jwt.sign({payload}, process.env.JWT_TOKEN_SECRET, {expiresIn: "3m"})
  res.cookie("user_cache", token, {maxAge: 180000, httpOnly: true, sameSite: "none", secure: true})
}

const generateEmailCodeToken = (payload, res) => {
  const token = jwt.sign({payload}, process.env.JWT_TOKEN_SECRET, {expiresIn: "30s"})
  res.cookie("email_code_cache", token, {maxAge: 30000, httpOnly: true, sameSite: "none", secure: true})
}

const generateAccessEmailToken = (payload, res) => {
  const token = jwt.sign({payload}, process.env.JWT_TOKEN_SECRET, {expiresIn: "3m"})
  res.cookie("access_email_cache", token, {maxAge: 180000, httpOnly: true, sameSite: "none", secure: true})
}

const generateRefreshEmailToken = (payload, res) => {
  const token = jwt.sign({payload}, process.env.JWT_TOKEN_SECRET, {expiresIn: "3m"})
  res.cookie("refresh_email_cache", token, {maxAge: 180000, httpOnly: true, sameSite: "none", secure: true})
}

module.exports = {
  generateAuthToken,
  generateEmailCodeToken,
  generateUserToken,
  generateAccessEmailToken,
  generateRefreshEmailToken
}