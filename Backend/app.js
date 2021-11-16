global.config = require(process.env.NODE_ENV === "production"
  ? "./config-prod.json"
  : "./config-dev.json");
const cors = require("cors"); // npm i cors
const express = require("express");
const fileUpload = require("express-fileupload");
const productsController = require("./controllers-layer/products-controller");
const authController = require("./controllers-layer/auth-controller");

const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload());

server.use("/api/products", productsController);
server.use("/api/auth", authController);

server.use("*", (request, response) =>
  response.status(404).send("Route not found.")
);

server.listen(3000, () => console.log("Start listining..."));
