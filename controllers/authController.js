const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;

    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "email already registered please Login",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
      address,
      phone,
      answer,
    });
    res.status(200).send({
      user,
      success: true,
      message: "successfully user registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register api",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        message: "please provide email or password",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        message: "user not found or password mismatch",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(500).send({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;

    res.status(200).send({
      user,
      message: " login Succefully",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in login api",
      error,
      success: false,
    });
  }
};

module.exports = { registerController, loginController };
