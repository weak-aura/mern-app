const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "weakaura1@gmail.com",
    pass: "ovxvvsmpuryvsorj",
  },
});

const sendMail = async (email, code) => {
  try {
    await transporter.sendMail({
      from: "weakaura1@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Подтверждение регистрации", // Subject line
      html: `<!DOCTYPE html>
            <html lang="ru">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Подтверждение регистрации</title>
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
              <style>
                body {
                  font-family: 'Inter', sans-serif;
                  background: linear-gradient(135deg, #f0f0f0, #e6e6e6);
                  margin: 0;
                  padding: 20px;
                  color: #333;
                }
                .container {
                  background-color: #ffffff;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 40px;
                  border-radius: 12px;
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                }
                .logo {
                  max-width: 180px;
                  margin: 0 auto;
                  display: block;
                }
                h2 {
                  font-size: 28px;
                  margin-top: 20px;
                  margin-bottom: 15px;
                  color: #212529;
                }
                p {
                  font-size: 16px;
                  line-height: 1.6;
                  margin-bottom: 25px;
                }
                .code-block {
                  background: linear-gradient(135deg, #007bff, #0056b3);
                  color: #fff;
                  font-size: 24px;
                  font-weight: 600;
                  padding: 14px 24px;
                  border-radius: 8px;
                  letter-spacing: 2px;
                  margin: 25px auto;
                  display: table;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  text-align: center;
                }
                .timer {
                  color: #777;
                  font-size: 14px;
                  text-align: center;
                  margin-top: 30px;
                }
                .footer {
                  color: #777;
                  font-size: 14px;
                  text-align: center;
                  margin-top: 20px;
                }
                .footer a {
                  color: #007bff;
                  text-decoration: none;
                }
                /* Медиа-запрос для адаптивности */
                @media (max-width: 480px) {
                  .container {
                    padding: 30px;
                  }
                  h2 {
                    font-size: 24px;
                  }
                  p {
                    font-size: 15px;
                  }
                  .code-block {
                    color: #000000;
                    font-size: 20px;
                    padding: 12px 20px;
                  }
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <img src="https://miro.medium.com/v2/0*hU4zJiyVwWcM0L-w.png" alt="logo" class="logo">
                  <h2>Добро пожаловать!</h2>
                  <p>Для завершения регистрации, пожалуйста, используйте следующий код:</p>
                  <div class="code-block">${code}</div>
                  <p>Этот код действителен в течение 30 секунд.</p>
                  <div class="footer">
                    <p>Если у вас возникли проблемы, обратитесь в <a href="https://wa.me/+77472999242">службу поддержки</a>.</p>
                  </div>
                </div>
              </div>
            </body>
            </html>`, // html body
    });
  }catch (error) {
    console.log("Error in sendMail 'nodemailer': ", error.message)
  }
}

module.exports = {sendMail};