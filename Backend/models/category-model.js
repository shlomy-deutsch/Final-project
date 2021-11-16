const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: String,
});

const CategoryModel = mongoose.model(
  "CategoryModel", // model name
  CategorySchema, // schema
  "categories" // collection name
);

module.exports = CategoryModel;
