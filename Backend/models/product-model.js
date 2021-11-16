const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    manufactureTime: Date,
    expirationTime: Date,
    categoryId: mongoose.Schema.Types.ObjectId
}, { toJSON: { virtuals: true }, id: false });

ProductSchema.virtual("category", {
    ref: "CategoryModel",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;