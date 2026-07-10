const express = require("express");
const {
  getUserController,
  updateUserInfo,
  resetUserPassword,
  updateUserPassword,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/getuser", authMiddleware, getUserController);
router.put("/update", authMiddleware, updateUserInfo);
router.post("/resetPassword", authMiddleware, resetUserPassword);
router.put("/updatePassword", authMiddleware, updateUserPassword);

router.delete("/deleteUser/:id", authMiddleware, deleteUser);
module.exports = router;
