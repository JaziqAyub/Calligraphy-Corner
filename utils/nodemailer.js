const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, //587
  secure: true,

  auth: {
    user: "jaziqayub00@gmail.com",
    pass: "lxwl llby wbrq hqgy",
  }
});



module.exports = {transporter}