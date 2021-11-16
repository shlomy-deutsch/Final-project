const fs = require("fs");
const path = require("path");
const express = require("express");
const ProductModel = require("../models/product-model");
const logic = require("../business-logic-layer/auth-logic");
const router = express.Router();

router.get("/products", async (request, response) => {
  try {
    const products = await logic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
  
});
router.get("/order", async (request, response) => {

  try {
    const products = await logic.getAllOrdersAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
  
});

router.get("/date/:id", async (request, response) => { 
  try {
    const id = +request.params.id;
    const product = await logic.getDateAsync(id);
    response.json(product);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
router.get("/", async (request, response) => {
  
  try {
    const products = await logic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
router.post("/login", async (request, response) => {

  try {
    const loggedInUser = await logic.loginAsync(request.body);
    if (!loggedInUser)
      return response.status(401).send("Incorrect username or password");
    response.json(loggedInUser);
  } catch (err) {
    response.status(500).send(err);
  }
});
router.get("/2", async (request, response) => {
  try {
    const products = await logic.getAllProductsAsync2();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/employees", async (request, response) => {
  try {
    const products = await logic.getAllEmployeesAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const product = await logic.getOneProductAsync(id);
    response.json(product);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const product = request.body;

    const addedProduct = await logic.addProductAsync(product);
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

    // Validations...

    // Extract the image file from the request:
    const image =
      request.files && request.files.image ? request.files.image : null;

    const updateProduct = await logic.updateProductAsync1(product);
    response.status(200).json(updateProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const product = request.body;
    product.id = id;

    // Validations...

    const updateProduct = await logic.updateProductAsync(product);
    if (!updateProduct)
      return response.status(400).json({ message: "What you are doing?!" });

    response.status(200).json(updateProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    // Validations...
    const deleted = await logic.deleteProductAsync(id);
    if (!deleted)
      return response.status(400).json({ message: "Could not delete row." });
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

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

module.exports = router;
