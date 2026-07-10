const orderModel = require("../models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payment method",
      });
    }
    let total = 0;

    cart.map((item) => {
      return (total += item.price);
    });

    const newOrder = new orderModel({
      food: cart,
      payment: total,
      buyer: req.userId,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order Api",
      error,
    });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(500).send({
        message: "please provide valid order id",
        success: false,
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
    if (!order) {
      return res.status(404).send({
        message: "order not found",
        success: false,
      });
    }
    res.status(200).send({
      success: true,
      message: "order status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in change order status Api",
      error,
    });
  }
};
module.exports = { placeOrder, changeOrderStatus };
