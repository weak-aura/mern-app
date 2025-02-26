const nodemailer = require("nodemailer");
const createEmailTemplate = (code) => {
  return `
    <!DOCTYPE html>
<html lang="ru">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Подтверждение регистрации</title>

</head>
<body style="font-family: Arial, sans-serif; background-color: #f0f0f0; margin: 0; padding: 20px; color: #333;">
<table align="center" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
  <tr>
    <td style="padding: 40px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://miro.medium.com/v2/0*hU4zJiyVwWcM0L-w.png" alt="logo" style="max-width: 180px; display: block; margin: 0 auto;">
          <h2 style="font-size: 28px; margin-top: 20px; margin-bottom: 15px; color: #212529;">Добро пожаловать!</h2>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Для завершения регистрации, пожалуйста, используйте следующий код:</p>
          <div style="background-color: #007bff; color: #fff; font-size: 24px; font-weight: 600; padding: 14px 24px; border-radius: 8px; letter-spacing: 2px; margin: 25px auto; display: table; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">${code}</div>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Этот код действителен в течение 30 секунд.</p>
          <div style="color: #777; font-size: 14px; text-align: center; margin-top: 20px;">
            <p>Если у вас возникли проблемы, обратитесь в <a href="https://wa.me/+77472999242" style="color: #007bff; text-decoration: none;">службу поддержки</a>.</p>
          </div>
      </div>
    </td>
  </tr>
</table>
</body>

</html>
  `;
};

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
      html: createEmailTemplate(code), // html body
    });
  }catch (error) {
    console.log("Error in sendMail 'nodemailer': ", error.message)
  }
}

module.exports = {sendMail};



