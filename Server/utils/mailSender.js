const nodemailer = require("nodemailer");
const { MAIL_HOST, MAIL_PASS, MAIL_USER } = process.env;
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    const info = transporter.sendMail({
      from: `StudyHub - By Aayan <${MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    // console.log(info);
    return info;
  } catch (err) {
    throw err;
  }
};

module.exports = mailSender;
