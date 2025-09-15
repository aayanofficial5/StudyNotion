const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryPageDetails,
} = require("../Controllers/Category");
const { auth } = require("../Middlewares/Authentication/auth");
const { isAdmin } = require("../Middlewares/Authorization/isAdmin");
const { isInstructor } = require("../Middlewares/Authorization/isInstructor");
const { isStudent } = require("../Middlewares/Authorization/isStudent");
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  editCourseDetails,
  deleteCourse,
  getInstructorCourses,
  getStudentCourses,
  getCoursesBySearch,
  getFullCourseDetails,
} = require("../Controllers/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../Controllers/Section");
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../Controllers/SubSection");
const { updateCourseProgress } = require("../Controllers/CourseProgress");
const { createRatingAndReview, getAllRatingAndReview } = require("../Controllers/RatingAndReview");

// routes

// categories routes
router.post("/categories", auth, isAdmin, createCategory);
router.get("/categories", getAllCategories);
router.get("/category-page/:name", getCategoryPageDetails);

// sections routes
router.post("/section", auth, isInstructor, createSection);
router.put("/section", auth, isInstructor, updateSection);
router.delete("/section", auth, isInstructor, deleteSection);

// courses routes
router.post("/", auth, isInstructor, createCourse);
router.get("/", getAllCourses);
router.put("/", auth, isInstructor, editCourseDetails);
router.delete("/:courseId", auth, isInstructor, deleteCourse);
router.get("/instructor", auth, isInstructor, getInstructorCourses);
router.get("/student", auth, isStudent, getStudentCourses);
router.get("/:courseId", getCourseDetails);
router.get("/search/:searchTerm", getCoursesBySearch);
router.get("/full/:courseId", auth, isStudent, getFullCourseDetails);
router.put("/progress", auth, isStudent, updateCourseProgress);

// subSections routes
router.post("/section/subsection/", auth, isInstructor, createSubSection);
router.put("/section/subsection", auth, isInstructor, updateSubSection);
router.delete("/section/subsection", auth, isInstructor, deleteSubSection);

// rating routes
router.post("/rating/review", auth, isStudent, createRatingAndReview);
router.get("/rating/review",getAllRatingAndReview);

module.exports = router;
