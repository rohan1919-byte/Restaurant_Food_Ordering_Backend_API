const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/80/950/png-clipart-computer-icons-foodie-blog-categories-miscellaneous-food.png",
    },
  },
  { timestamps: true },
);

const Category = mongoose.model("Category ", categorySchema);
module.exports = Category;
