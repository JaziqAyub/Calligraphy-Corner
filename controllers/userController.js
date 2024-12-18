const { User } = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { transporter } = require("../utils/nodemailer")

const registerHandler = async (req, res) => {
  try {

    // const username = req.body.username
    // const email = req.body.email
    // const password = req.body.password

    const { username, email, password } = req.body


    if (username !== "" && email !== "" && password !== "") {

      const findUser = await User.findOne({ email })
      if (findUser) {
        return res.json({ message: "User already exists." })

      }

      const hashPass = await bcrypt.hash(password, 10)
      const createUser = await User.create({ username, email, password: hashPass })
      if (createUser) {
        return res.json({ message: "User created succesfully!" })
      }



    } else {
      res.json({ message: "All credentials required." })
    }







  } catch (error) {
    console.error(error)
  }
}


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
    const secretKey = "secretKey";
    const token = jwt.sign({ userId }, secretKey);

    return res.status(200).json({
      message: "Logged in successfully!",
      token: token,
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
    const id = user._id

    if (!user) {
      return res.status(400).json({ message: "User Not found , Kindly Register." });
    }

    // const passwordResetLink = `http://localhost:4000/user/password/reset/${id}`;

    const passwordResetLink = `http://localhost:4011/user/password/reset/${id}`;

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
      return res.status(500).json({ message: "Some error . Kindly try again after sometime" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};


const deleteUserHandler = async (req, res) => {
  try {

    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all credentials" })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const verifyPass = await bcrypt.compare(password, user.password)
    if (!verifyPass) {
      res.status(404).json({ message: "Password does not match" })
    }
    await User.findOneAndDelete({ email })
    return res.status(200).json({ message: "User deleted successfuly!" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error!" })
  }
}


const getUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email })

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


module.exports = { registerHandler, loginHandler, forgotPassHandler, resetPassHandler, deleteUserHandler, getUser, changePasshandler }