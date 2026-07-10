const restaurentModel = require("../models/restaurentModel");

const createRestaurent = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      pickup,
      time,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).send({
        message: "please provide title and address",
        success: false,
      });
    }
    const newRestaurent = new restaurentModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRestaurent.save();
    res.status(200).send({
      success: true,
      message: "New Restaurent Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in create restaurant api",
      success: false,
      error,
    });
  }
};

const getAllRestaurent = async (req, res) => {
  try {
    const restaurants = await restaurentModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        message: "restarant not found",
        success: false,
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in get all restaurents api",
      success: false,
      error,
    });
  }
};

const getsingleRest = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        message: "please provide restaurant ID",
        success: false,
      });
    }
    const restaurant = await restaurentModel.findById(id);
    if (!restaurant) {
      return res.status(404).send({
        message: "restaurant not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "restaurant found successfully",
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in get single restaurant api",
      success: false,
      error,
    });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return res.status(404).send({
        message: " provide restaurant id",
        success: false,
      });
    }

    const restaurant = await restaurentModel.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).send({
        message: "restaurant not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "restaurant deleted successfully",
      success: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in restaurant delete api",
      success: false,
      error,
    });
  }
};
module.exports = {
  createRestaurent,
  getAllRestaurent,
  getsingleRest,
  deleteRestaurant,
};
