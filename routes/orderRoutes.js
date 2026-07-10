const express = require("express");
const {
  placeOrder,
  changeOrderStatus,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express.Router();

router.post("/placeOrder", authMiddleware, placeOrder);

router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  changeOrderStatus,
);

module.exports = router;
