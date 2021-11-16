const path = require("path");
const dal = require("../data-access-layer/dal-sql");
const uuid = require("uuid");

var currentdate = new Date();
var datetime =
  currentdate.getFullYear() +
  "-" +
  (currentdate.getMonth() + 1) +
  "-" +
  (currentdate.getDate() );
async function getAllProductsAsync1() {
  const sql = "SELECT category_ID as id, category_Name FROM categories;";
  const products = await dal.executeAsync(sql);
  return products;
}

async function getProductByCategoryAsync(id) {
  const sql = `SELECT product_Id as id, 
        name, 
        price,
        image,
        category_ID
        FROM products
        WHERE products.category_ID = ${id}`;
  const products = await dal.executeAsync(sql);
  return products;
}
async function getProductBySearchAsync(name) {
  const sql = `SELECT product_Id as id, 
        name,
        price,
        image,
        category_ID
        FROM products
        WHERE name = '${name}'`;

  const products = await dal.executeAsync(sql);
  return products;
}

async function addProductAsync(product, image) {
  const sql = `INSERT INTO products(name, price, category_ID)
                VALUES('${product.name}', ${product.price}, ${product.category_ID})`;
  const addedProduct = await dal.executeAsync(sql);
  product.id = addedProduct.insertId;

  const extension = image.name.substr(image.name.lastIndexOf("."));
  const fileName = `${product.id}${extension}`;
  product.imageName = fileName;
  const absolutePath = path.join(
    __dirname,
    "..",
    "images",
    "products",
    fileName
  );
  await image.mv(absolutePath);

  const updateSql = `UPDATE products SET image = '${fileName}' WHERE product_Id = ${product.id}`;
  await dal.executeAsync(updateSql);
  return product;
}

async function addProductCartAsync(product) {
  const sql = `INSERT INTO products_cart(product_ID, count, cart_ID, total_Price)
                VALUES(${product.id}, ${product.count}, ${product.cart_ID}, ${product.total_Price})`;
  const addedProduct = await dal.executeAsync(sql);
  return addedProduct;
}

async function addCartAsync(product) {
  const sql = `INSERT INTO carts (castumer_ID, date, open) VALUES (${product.castumer_ID}, '${datetime}', 1)`;
  const sql1 = `UPDATE castumers SET open = 1 WHERE castumer_ID = ${product.castumer_ID}`;
  const update = await dal.executeAsync(sql1);
  const user = await dal.executeAsync(sql);
  return user.insertId;
}

async function updateCartAsync(product) {

  const sql1 = `UPDATE carts SET date = '${datetime}' WHERE castumer_ID = ${product} AND open = 1`;
  const user1 = await dal.executeAsync(sql1);

  const sql2 = `SELECT cart_ID FROM carts WHERE castumer_ID = ${product} AND open = 1`;

  const user = await dal.executeAsync(sql2);
  return user[0].cart_ID;
}

async function getCartProductAsync(id) {
  const sql = `SELECT products_cart.product_ID, total_Price, count, name, image
  FROM products_cart JOIN products
  ON products_cart.product_ID = products.product_ID
        WHERE cart_ID = ${id}`;

  const products = await dal.executeAsync(sql);
  return products;
}





async function updateProductAsync(product, image) {
  const sql = `UPDATE products SET name = '${product.name}', price = ${product.price}, category_ID = ${product.category_ID} WHERE product_ID = ${product.id}`;

  const addedProduct = await dal.executeAsync(sql);
  if (image) {
    const name = uuid.v4();

    const extension = image.name.substr(image.name.lastIndexOf("."));
    const fileName = `${name}${extension}`;
    product.imageName = fileName;
    const absolutePath = path.join(
      __dirname,
      "..",
      "images",
      "products",
      fileName
    );
    await image.mv(absolutePath);

    const updateSql = `UPDATE products SET image = '${fileName}' WHERE product_Id = ${product.id}`;
    await dal.executeAsync(updateSql);
  }
  return product;
}
async function updateProductCartAsync(product) {

  const sql = `UPDATE products_Cart SET
               count = ${product.count},
               total_Price = ${product.total_Price}
               WHERE cart_ID = ${product.cart_ID} AND product_ID = ${product.id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? null : product;
}

async function deleteProductAsync(id, name) {
  const sql = `DELETE FROM products_cart WHERE product_ID = ${id} AND cart_ID = ${name}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? false : true;
}
async function deleteAllProductAsync(id) {
  const sql = `DELETE FROM products_cart WHERE cart_ID = ${id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? false : true;
}
async function addOrderAsync(product) {
  const sql = `SELECT * FROM orders WHERE delivery_Date = '${product.delivery_Date}';`;
  const check = await dal.executeAsync(sql);
  if (check.length >= 3) return null;
  const sql1 = `INSERT INTO orders SET castumer_ID = ${product.castumer_ID},
               cart_ID = ${product.cart_ID},
               total_Price = ${product.total_Price},
               city = '${product.city}',
               street = '${product.street}',
               delivery_Date = '${product.delivery_Date}',
               order_Date = '${datetime}',
               credit = ${product.credit};`;
  const insert = await dal.executeAsync(sql1);
  const sql3 = `UPDATE castumers SET open = 2 WHERE castumer_ID = ${product.castumer_ID};`;
  const updated = await dal.executeAsync(sql3);
  const sql4 = `UPDATE carts SET open = 0 WHERE cart_ID = ${product.cart_ID};`;
  const updated1 = await dal.executeAsync(sql4);
  return insert;
}

module.exports = {
  addOrderAsync,
  getProductBySearchAsync,
  getCartProductAsync,
  updateCartAsync,
  addCartAsync,
  getAllProductsAsync1,
  getProductByCategoryAsync,
  addProductAsync,
  addProductCartAsync,
  updateProductAsync,
  updateProductCartAsync,
  deleteProductAsync,
  deleteAllProductAsync,
};
