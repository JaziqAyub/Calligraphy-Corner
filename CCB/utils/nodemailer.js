const nodemailer = require("nodemailer");
require("dotenv").config()

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, //587
  secure: true,

  auth: {
    user: "jaziqayub00@gmail.com",
    pass: process.env.MAILER_PASS
  }
});



module.exports = {transporter}