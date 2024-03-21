const express = require("express");
const CategoryController = require("../controller/categoryController");

const route = express.Router();

route.route('/categories').post(CategoryController.createCategory);

module.exports = route;