const path = require("path");
const dal = require("../data-access-layer/dal-sql");
const ProductModel = require("../models/product-model");
const jwtHelper = require("../helpers/jwt-helper");

async function getOneProductAsync(id) {
  const sql = `SELECT castumer_ID
        FROM castumers
        WHERE castumer_ID = ${id}`;

  const products = await dal.executeAsync(sql);
  return products[0];
}
async function getDateAsync(id) {
  const sql = `SELECT date
  FROM carts
        WHERE castumer_ID = ${id} AND open = 1`;
  var products = await dal.executeAsync(sql);
  if (products.length == 0) {
    const sql1 = `SELECT date
  FROM carts
        WHERE castumer_ID = ${id} AND open = 0 ORDER BY date DESC LIMIT 1`;
    products = await dal.executeAsync(sql1);
  }
  return products[0].date;
}
async function addProductAsync(product) {
  const sql = `INSERT INTO castumers (castumer_ID, first_Name, last_Name, username, password, city, street, admin, open)
                VALUES(${product.castumer_ID}, '${product.first_Name}', '${product.last_Name}' , '${product.username}', '${product.password}', '${product.city}', '${product.street}', 0, 0)`;

  const addedProduct = await dal.executeAsync(sql);
  product.id = addedProduct.insertId;
  product.token = jwtHelper.getNewToken(product);

  return product;
}
async function loginAsync(credentials) {
  const sql = `SELECT castumer_ID, street, city, username, admin, open FROM castumers WHERE username = '${credentials.username}' AND password = '${credentials.password}' LIMIT 1`;
  const user = await dal.executeAsync(sql);
  if (user.length === 0) return null;
 const users = user[0]
  users.token = jwtHelper.getNewToken(users);

  return users;
}

async function getAllProductsAsync() {
  const sql = "SELECT * FROM products";
  const products = await dal.executeAsync(sql);
  return products.length;
}

async function getAllOrdersAsync() {
  const sql = "SELECT * FROM orders;";
  const products = await dal.executeAsync(sql);
  return products.length;
}

module.exports = {
  getOneProductAsync,
  addProductAsync,
  loginAsync,
  getAllProductsAsync,
  getAllOrdersAsync,
  getDateAsync
};
