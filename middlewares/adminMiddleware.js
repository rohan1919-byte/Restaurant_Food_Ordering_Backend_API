const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    if (user.userType !== "admin") {
      return res.status(401).send({
        success: false,
        message: "only admin access",
      });
    } else {
      next();
    }
  } catch (error) {
    (console.log(error),
      res.status(500).send({
        success: false,
        message: "UnAuthorized Access",
        error,
      }));
  }
};
module.exports = authMiddleware;
