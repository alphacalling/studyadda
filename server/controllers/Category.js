const Category = require("../models/Category")
const Course = require("../models/Course")

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// create course category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" })
    }
    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    })
    console.log(CategorysDetails)
    return res.status(200).json({
      success: true,
      data: CategorysDetails,
      message: "Category Created Successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// show all categories
exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find()
    res.status(200).json({
      success: true,
      data: allCategorys,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// category page details
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body

    // Get courses for the specified category with instructor and reviews populated
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [
          { path: "instructor", select: "firstName lastName email image" },
          { path: "ratingAndReviews" },
        ],
      })
      .exec()

    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }

    // Get courses for other categories with instructor and reviews populated
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = null
    if (categoriesExceptSelected.length > 0) {
      differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: [
            { path: "instructor", select: "firstName lastName email image" },
            { path: "ratingAndReviews" },
          ],
        })
        .exec()
    }

    // Get top-selling courses directly from Course collection (properly populated & deduplicated)
    const allPublishedCourses = await Course.find({ status: "Published" })
      .populate("instructor", "firstName lastName email image")
      .populate("ratingAndReviews")
      .exec()

    const mostSellingCourses = allPublishedCourses
      .sort((a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0))
      .slice(0, 10)

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// update course category
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId, name, description } = req.body
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      })
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        name: name,
        description: description,
      },
      { new: true }
    )

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    return res.status(200).json({
      success: true,
      data: updatedCategory,
      message: "Category updated successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// delete course category
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      })
    }

    const category = await Category.findById(categoryId)
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    // Safety check: Cannot delete category if courses are associated with it
    if (category.courses && category.courses.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${category.courses.length} linked course(s). Reassign or delete courses first.`,
      })
    }

    await Category.findByIdAndDelete(categoryId)

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

