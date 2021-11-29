const fs = require("fs");
const path = require("path");
const express = require("express");
// const ProductModel = require("../models/product-model");
const logic = require("../business-logic-layer/products-logic");
const router = express.Router();
const verifyLoggedIn = require("../middlewear/verify-logged-in");

router.get("/images/:name", (request, response) => {

  try {
    const name = request.params.name;
    let absolutePath = path.join(__dirname, "..", "images", "products", name);
    if (!fs.existsSync(absolutePath)) {
      absolutePath = path.join(__dirname, "..", "images", "not-found.png");
    }
    response.sendFile(absolutePath);
  } catch (err) {
    response.status(500).send(err.message);
  }
});



router.use(verifyLoggedIn);
router.get("/categories", async (request, response) => {
  try {
    const products = await logic.getAllProductsAsync1();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const product = await logic.getProductByCategoryAsync(id);
    response.json(product);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const product = request.body;
    const image =
      request.files && request.files.image ? request.files.image : null;
    if (!image) return response.status(400).send("Missing image.");
    const addedProduct = await logic.addProductAsync(product, image);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/cart", async (request, response) => {
  try {
    const product = request.body;
    const addedProduct = await logic.addProductCartAsync(product);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
router.put("/cart", async (request, response) => {
  try {
    const product = request.body;
    const addedProduct = await logic.updateProductCartAsync(product);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/cart/:cartid", async (request, response) => {
  try {
    const cartid = +request.params.cartid;
    const product = await logic.getCartProductAsync(cartid);
    response.json(product);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/search/:name", async (request, response) => {
  try {
    const name = request.params.name;
    const product = await logic.getProductBySearchAsync(name);
    response.json(product);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
router.post("/carts", async (request, response) => {
  try {
    const product = request.body;
    const addedProduct = await logic.addCartAsync(product);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
router.post("/order", async (request, response) => {
  try {
    const product = request.body;
    const addedProduct = await logic.addOrderAsync(product);
    if(!addedProduct)
    return response.status(401).send("תאריך זה תפוס בחר תאריך אחר");
    response.json(addedProduct);
  } catch (err) {
    response.status(500).send();
  }
});
router.put("/carts/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const addedProduct = await logic.updateCartAsync(id);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const product = request.body;
    product.id = id;

    const image =
      request.files && request.files.image ? request.files.image : null;
    const updateProduct = await logic.updateProductAsync(product, image);
    response.status(200).json(updateProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.delete("/:id/:cart", async (request, response) => {
  try {
    const id = +request.params.id;
    const cart= request.params.cart
    const deleted = await logic.deleteProductAsync(id, cart);
    if (!deleted)
      return response.status(400).json({ message: "Could not delete row." });
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
router.delete("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const deleted = await logic.deleteAllProductAsync(id);
    if (!deleted)
      return response.status(400).json({ message: "Could not delete row." });
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});




module.exports = router;
