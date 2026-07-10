const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
  {
    food: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
    ],
    payment: {
      type: Object,
      default: {},
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: ["preparing", "prepared", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
