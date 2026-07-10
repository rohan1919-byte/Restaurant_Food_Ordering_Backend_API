const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "unauthorize user",
        });
      } else {
        req.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    (console.log(error),
      res.status(500).send({
        success: false,
        message: "Please Provide Auth Token",
        error,
      }));
  }
};
module.exports = authMiddleware;
