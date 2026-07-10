const categoryModel = require("../models/categoryModel");
const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      res.status(500).send({
        message: "please provide category title or image",
        success: false,
      });
    }
    const newCategory = new categoryModel({
      title,
      imageUrl,
    });
    await newCategory.save();
    res.status(200).send({
      message: "Category Created Successfully",
      success: true,
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in create category api",
      success: false,
      error,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    if (!category) {
      return res.status(404).send({
        message: "Category Not Found",
        success: false,
      });
    }
    res.status(200).send({
      message: "all category found successfully ",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in getAll category api",
      success: false,
      error,
    });
  }
};

const getOneCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        message: "please provide category id",
        success: false,
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        message: "Category Not Found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Category Found Successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in getOne category api",
      success: false,
      error,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        title,
        imageUrl,
      },
      { new: true },
    );
    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "no category found",
      });
    }
    res.status(200).send({
      message: "category updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in update category api",
      success: false,
      error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "please provide category id",
      });
    }
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "category not found",
      });
    }
    res.status(200).send({
      message: "Category Deleted Successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in delete category api",
      success: false,
      error,
    });
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
