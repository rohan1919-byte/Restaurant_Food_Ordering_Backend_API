const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createfood,
  getAllFood,
  singleFood,
  getFoodByRestaurant,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const router = express.Router();

router.post("/create", authMiddleware, createfood);

router.get("/getAll", authMiddleware, getAllFood);

router.get("/getSingle/:id", singleFood);

router.get("/getByRestaurant/:id", getFoodByRestaurant);

router.put("/update/:id", authMiddleware, updateFood);

router.delete("/delete/:id", authMiddleware, deleteFood);
module.exports = router;
