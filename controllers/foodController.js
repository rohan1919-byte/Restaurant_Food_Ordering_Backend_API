const foodModel = require("../models/foodModel");

const createfood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        message: "please provide all fields",
        success: false,
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    await newFood.save();
    res.status(200).send({
      message: "New Food Item Created",
      success: true,
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in Create Food Api",
      success: false,
      error,
    });
  }
};

const getAllFood = async (req, res) => {
  try {
    const getfood = await foodModel.find({});
    if (!getfood) {
      return res.status(404).send({
        message: "food not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Food Found Successfull",
      success: true,
      getfood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in get All Food Api",
      success: false,
      error,
    });
  }
};

const singleFood = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        message: "food id not found",
        success: false,
      });
    }
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).send({
        message: "food not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "food found successfully",
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in get single Food Api",
      success: false,
      error,
    });
  }
};

const getFoodByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(500).send({
        message: "restaurant id not found",
        success: false,
      });
    }
    const food = await foodModel.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        message: "food not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "food based on restaurant ",
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in get food by restaurant Api",
      success: false,
      error,
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        message: "food id not found",
        success: false,
      });
    }

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
        ratingCount,
      },
      { new: true },
    );

    if (!updatedFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "food item was updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in update food Api",
      success: false,
      error,
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        message: "food id not found",
        success: false,
      });
    }
    const food = await foodModel.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).send({
        message: "food not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "food item deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in delete food Api",
      success: false,
      error,
    });
  }
};
module.exports = {
  createfood,
  getAllFood,
  singleFood,
  getFoodByRestaurant,
  updateFood,
  deleteFood,
};
