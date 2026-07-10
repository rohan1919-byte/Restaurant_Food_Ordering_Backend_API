const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategory,
  getAllCategory,
  getOneCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/create", authMiddleware, createCategory);

router.get("/getAll", authMiddleware, getAllCategory);

router.get("/getOne/:id", authMiddleware, getOneCategory);

router.put("/update/:id", authMiddleware, updateCategory);

router.delete("/delete/:id", authMiddleware, deleteCategory);
module.exports = router;
