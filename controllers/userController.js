const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    const id = req.userId;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "user get successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get user api",
      error,
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const id = req.userId;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "user not found",
      });
    }

    const { username, address, phone } = req.body;
    if (username) {
      user.username = username;
    }
    if (address) {
      user.address = address;
    }
    if (phone) {
      user.phone = phone;
    }

    await user.save();

    res.status(200).send({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update api",
      error,
    });
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        message: "something is missing",
        success: false,
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found or invalid answer",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      message: "password changes Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: false,
      message: " error in reset password api",
      error,
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const id = req.userId;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        message: "something is missing",
        success: false,
      });
    }

    const isMatch = bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        message: "invalid old password",
        success: false,
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "password updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in update password api",
      success: false,
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({
        message: "user not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Your account has been deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in delete api",
      success: false,
    });
  }
};
module.exports = {
  getUserController,
  updateUserInfo,
  resetUserPassword,
  updateUserPassword,
  deleteUser,
};
