const {UserModel} = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const {
  generateAuthToken,
  generateEmailCodeToken,
  generateUserToken,
  generateAccessEmailToken,
  generateRefreshEmailToken,
} = require("../utils/generateToken");
const {initiateUserEmailVerification, InitiatePasswordResetByEmail} = require("../utils/nodemailer");
const register = async (req, res) => {
  try {
    const {email, username, password} = req.body
    const generateCode = Math.floor(100000 + Math.random() * 900000)

    const userExists = await UserModel.findOne({email})
    if (userExists) {
      return res.status(401).json({error: "Пользователь с такой почтой уже существует"})
    } else if (email.length < 1) {
      return res.status(401).json({error: "Введите название почты"})
    } else if (username.length < 4) {
      return res.status(401).json({error: "Имя пользователя должен быть не менее 4 букв"})
    } else if (password.length < 6) {
      return res.status(401).json({error: "Пароль должен быть не менее 6 символов"})
    }

    const salt = bcrypt.genSaltSync(10);

    const hashPassword = bcrypt.hashSync(password, salt)

    const user = new UserModel({
      email: email,
      username,
      password: hashPassword
    })


    if (user) {
      generateUserToken(user, res)
      generateEmailCodeToken(generateCode, res)
      await initiateUserEmailVerification(email, generateCode)
      res.status(201).json({
        message: `Код для верификаций отправлен на почту: ${email}, время действия кода 3 минуты`,
        status: "register",
      })
    }

  } catch (error) {
    console.log("Error in register: ", error.message)
    res.status(500).json({error: "Error in Register"})
  }
}

const verification = async (req, res) => {
  try {
    const payload = req.user
    const code = req.code
    const {verifyCode} = req.body

    const newUser = new UserModel({
      email: payload.email,
      username: payload.username,
      password: payload.password,
    })

    if (verifyCode !== String(code)) {
      return res.status(400).json({
        error: "Введенный вами код не правильный, пожалуйста проверьте вашу почту",
        toastify: "error"
      })
    } else {
      await newUser.save();
      res.status(201).json({
        message: "Регистрация прошла успешно", 
        status: "verification"
      });
    }
  } catch (error) {
    console.log("Error in verification: ", error.message)
    res.status(500).json({error: "Error in verification"})
  }
}

const resendCode = async (req, res) => {
  try {
    const payload = req.user
    const generateCode = Math.floor(100000 + Math.random() * 900000)

    await initiateUserEmailVerification(payload.email, generateCode);
    generateEmailCodeToken(generateCode, res);

    res.status(201).json({message: `Код был отправлен повторно на почту ${payload.email}`});
  } catch (error) {
    console.error("Error in resendCode:", error);
    res.status(500).json({error: "Resend Code Error"});
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body
    const userExists = await UserModel.findOne({email})
    if (!userExists) {
      return res.status(404).json({error: "Пользователь с такой почтой не существует"})
    }

    const comparePassword = await bcrypt.compare(password, userExists?.password || "")

    if (!comparePassword) {
      return res.status(400).json({error: "Пароль не верный"})
    }

    generateAuthToken(userExists.id, res)

    res.status(201).json({message: "Вы успешно авторизовались", status: "login"})

  } catch (error) {
    console.log("Error in login: ", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}
const logout = async (req, res) => {
  try {
    res.clearCookie("auth_cache",
      {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });
    res.status(201).json({message: "Вы вышли из своей учетной записи", status: "logout"})
  } catch (error) {
    console.log("Error in logout: ", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}
const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password")

    res.status(201).json({user, status: "getme"})
  } catch (error) {
    console.log("Error in logout: ", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

const recoverPassword = async (req, res) => {
  try {
    const generateCode = Math.floor(100000 + Math.random() * 900000)
    const {email} = req.body
    const userExists = await UserModel.findOne({email});
    if (!userExists) {
      return res.status(404).json({error: "Пользователь с такой почтой не существует"})
    }

    if (userExists) {
      generateAccessEmailToken(email, res)
      generateEmailCodeToken(generateCode, res)
      await InitiatePasswordResetByEmail(email, generateCode)
      res.clearCookie("refresh_email_cache",
        {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        });
      res.status(200).json({
        message: `Код для сброса пароля был отправлен на почту ${email}`,
        status: "recover_password"
      })
    }

  } catch (error) {
    console.log("error in recoverPassword:", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

const recoverPasswordEmailVerification = async (req, res) => {
  try {
    const {verifyCode} = req.body
    const code = req.code
    const email = req.email

    if (verifyCode !== String(code)) {
      return res.status(400).json({error: "Введенный вами код не правильный, пожалуйста проверьте вашу почту"})
    } else {
      generateRefreshEmailToken(email, res)
      res.clearCookie("access_email_cache",
        {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        });
    }

    res.status(200).json({message: "Ваш код подтвержден", status: "r_pwd_email_verified"})

  } catch (error) {
    console.log("error in passwordResetEmailVerification:", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

const recoverPasswordResendCode = async (req, res) => {
  try {
    const email = req.email
    const generateCode = Math.floor(100000 + Math.random() * 900000)

    if (email) {
      generateAccessEmailToken(email, res)
      generateEmailCodeToken(generateCode, res)
      await InitiatePasswordResetByEmail(email, generateCode)
      res.status(200).json({message: `Код повторно отправлен на почту ${email}`, cookie_code: "valid_code"})
    }
    
  } catch (error) {
    console.log("error in recoverPasswordResendCode:", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

const recoverPasswordReset = async (req, res) => {
  try {
    const {password, confirmPassword} = req.body;
    const email = req.email

    if (password !== confirmPassword) {
      return res.status(400).json({error: "Пароли не совпадают"})
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt)


    const passwordUpdated = await UserModel.findOneAndUpdate({email}, {password: hashPassword})
    res.clearCookie("refresh_email_cache",
      {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });
    res.status(200).json({message: "Ваш пароль успешно изменен", status: "password_updated"})

  } catch (error) {
    console.log("error in passwordReset:", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

module.exports = {
  register,
  verification,
  resendCode,
  login,
  logout,
  getMe,
  recoverPassword,
  recoverPasswordEmailVerification,
  recoverPasswordResendCode,
  recoverPasswordReset,
}