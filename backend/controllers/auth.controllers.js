const {UserModel} = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const {generateAuthToken, generateEmailCodeToken, generateUserToken} = require("../utils/generateToken");
const {sendMail} = require("../utils/sendMail");
const register = async (req, res) => {
  try {
    const {email, username, password} = req.body
    const generateCode = Math.floor(100000 + Math.random() * 900000)

    const userExists = await UserModel.findOne({email})
    if (userExists) {
      return res.status(401).json({error: "Пользователь с такой почтой уже существует"})
    } else if (username.length < 4) {
      return res.status(401).json({error: "Имя пользователя должна быть не менее 4 букв"})
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
      await sendMail(email, generateCode)
      res.status(201).json({
        message: `Код для верификаций отправлен на почту: ${email}, время действия кода 30 секунд`,
        status: "register"
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
      res.status(201).json({message: "Регистрация прошла успешно", status: "verification",});
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

    await sendMail(payload.email, generateCode);
    generateEmailCodeToken(generateCode, res);

    res.status(201).json({message: `Код был отправлен повторно на почту ${payload.email}`, status: "resendCode"});
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
    res.clearCookie("auth_token", 
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
const getme = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password")

    res.status(201).json({message: "Аутентификация прошла успешно", user, status: "getme"})
  } catch (error) {
    console.log("Error in getme: ", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

module.exports = {register, verification, resendCode, login, logout, getme}