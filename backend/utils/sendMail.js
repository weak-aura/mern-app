const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.TRANSPORTER_USER,
    pass: process.env.TRANSPORTER_PASS,
  },
});

const sendMail = async (email, code) => {
  try {
    await transporter.sendMail({
      from: process.env.TRANSPORTER_USER, // sender address
      to: email, // list of receivers
      subject: "Подтверждение регистрации", // Subject line
      html: `
       <div>
        <p>Здравствуйте!</p>
        <p>Ваш код подтверждения регистрации: <strong>${code}</strong></p>
        <p>Пожалуйста, используйте этот код для завершения регистрации.</p>
       </div>
      `, // html body
    });
  }catch (error) {
    console.log("Error in sendMail 'nodemailer': ", error.message)
  }
}

module.exports = {sendMail};



