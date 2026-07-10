const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurent,
  getAllRestaurent,
  getsingleRest,
  deleteRestaurant,
} = require("../controllers/restaurentController");

router.post("/create", authMiddleware, createRestaurent);

router.get("/getAll", authMiddleware, getAllRestaurent);

router.get("/getsingleRest/:id", authMiddleware, getsingleRest);

router.delete("/deleteRestaurant/:id", deleteRestaurant);
module.exports = router;
