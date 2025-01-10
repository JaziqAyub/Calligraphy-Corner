const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { transporter } = require("../utils/nodemailer");
const { messageHandler } = require("../utils/messageHandler");
const { uploadToCloud } = require("../utils/cloudinary");
const { Item } = require("../models/itemModel");
require("dotenv").config();

const registerHandler = async (req, res) => {
  try {
    // const username = req.body.username
    // const email = req.body.email
    // const password = req.body.password

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All credentials required" });
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.json({ message: "User already exists." });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      username,
      email,
      password: hashPass,
    });
    if (createUser) {
      return res.json({ message: "User created succesfully!" });
    } else {
      return res.json({ message: "All credentials required." });
    }
  } catch (error) {
    console.error(error);
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All credentials Required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    //   if (password === user.password){
    //     return res.status(200).json({ message: "Logged in Succesfully" });

    //   }

    const passverify = await bcrypt.compare(password, user.password);

    if (!passverify) {
      return res.status(400).json({ message: "Password incorrect!" });
    }

    const userId = user._id;
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ userId }, secretKey);

    if (token) {
      res.cookie("token", token, {
        //saving token in cookies
        maxAge: 1000 * 60 * 60 * 24 * 30, //1month
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });
    }

    return res.status(200).json({
      message: "Logged in successfully!",
      token: token,
      userId: userId,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server Error!" });
  }
};

const forgotPassHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email Required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not found , Kindly Register." });
    }

    // const passwordResetLink = `http://localhost:4000/user/password/reset/${id}`;
    const id = user._id;

    // const passwordResetLink = `http://localhost:4011/user/password/reset/${id}`; for backend
    const passwordResetLink = `http://localhost:3000/user/resetPass/${id}`; // for frontEnd

    // const sendMail = await transporter.sendMail({

    //   from : "services@stylehouse.world",
    //   to : email,
    //   subject : "Password reset Link ",
    //   text : passwordResetLink,

    // })

    // if(sendMail){
    //   return res
    //   .status(200)
    //   .json({
    //     message: "Password Rest link sent to your mail Succesfully",
    //   });
    // }

    transporter.sendMail(
      {
        from: "jaziqayub00@gmail.com",
        to: email,
        // bcc : "services@stylehouse.world",
        subject: "Password reset Link ",
        text: passwordResetLink,
        // html : "<h1> ur pass link is here all the css in the html string will be inline </h1>"
      },
      (reject, resolve) => {
        if (reject) {
          console.log(reject);
          return res.status(500).json({ message: "Server Error" });
        }

        return res.status(200).json({
          message: "Password Rest link sent to your mail Succesfully",
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const resetPassHandler = async (req, res) => {
  try {
    // const {email , newPass , confirmPass} = req.body

    // const user = await User.findOne({email})

    // const userId = user._id

    // if(newPass !== confirmPass) {
    //   return res.status(400).json("Password Doesnot match!")
    // }

    // const hashPass = await bcrypt.hash(newPass , 10)

    // const updatePass = await User.findByIdAndUpdate(userId , {

    //   password : hashPass

    // })

    const { newPass, confirmPass } = req.body;

    const { userId } = req.params;

    if (!newPass || !confirmPass) {
      return res.status(400).json({ message: "All credentials required" });
    }

    if (newPass !== confirmPass) {
      return res.status(400).json("Password Does not match!");
    }

    const hashPass = await bcrypt.hash(newPass, 10);

    const updatePass = await User.findByIdAndUpdate(userId, {
      password: hashPass,
    });

    if (updatePass) {
      return res.status(200).json({ message: "Password Changed Succesfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Some error . Kindly try again after sometime" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const userId = req.userId; //from isauthenticated
    const { password } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "no user" });
    }
    if (!password) {
      return res.status(400).json({ message: "no pass" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const verifyPass = await bcrypt.compare(password, user.password);
    if (!verifyPass) {
      return res.status(404).json({ message: "Password does not match" });
    }
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "User deleted successfuly!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate({
      path : "items"
    })

    if (user) {
      res.status(200).json({ message: "User Found", payload: user });
    } else {
      res.status(404).json({ message: "user not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("server Error");
  }
};

const changePasshandler = async (req, res) => {
  try {
    // const { email } = req.body;

    const { email, oldPass, newPass, confirmPass } = req.body;

    if (!email || !oldPass || !newPass || !confirmPass) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (newPass !== confirmPass) {
      return res.status(400).json({
        message: "New Password and Confirm Password do not match.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ messgae: "User not found!" });
    }

    const verifyPass = await bcrypt.compare(oldPass, user.password);

    if (verifyPass) {
      const hashPass = await bcrypt.hash(newPass, 10);

      await User.findOneAndUpdate(user._id, {
        password: hashPass,
      });

      res.status(200).json({ message: "Password changed Succesfully!" });
    } else {
      res.status(400).json({ message: "Old password is incorrect!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

//forCloudinary
const uploadItemPic = async (req, res) => {
  try {
    const { itemId } = req.query;
    const item = await Item.findById(itemId);
    const user = await User.findById(req.userId);
    if (!item) {
      return messageHandler(res, 404, "Item not found");
    }
    if (!user) {
      return messageHandler(res, 404, "User not found");
    }

    if (user.role == "admin") {
      const {image} = req.body;
      const upload = await uploadToCloud(image);

      item.picUrls = upload.secure_url;
      await item.save();
      return messageHandler(res, 200, "Uploaded Successfully", upload);
    } else {
      return messageHandler(
        res,
        403,
        "Some error, kindly upload after sometime!"
      );
    }
  } catch (error) {
    console.log(error);
    messageHandler(
      res,
      500,
      "Server error"
    );
  }
};

module.exports = {
  registerHandler,
  loginHandler,
  forgotPassHandler,
  resetPassHandler,
  deleteUserHandler,
  getUser,
  changePasshandler,
  uploadItemPic,
};
