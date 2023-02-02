const express = require("express");
const { verify } = require("jsonwebtoken");
const route = express.Router();

const homeController = require("../controllers/homeController");
const logoutController = require("../controllers/logoutController");
const verifyTokenController = require("../controllers/verifyTokenController");

route.get("/home", homeController.home);
route.get("/logout", logoutController.handleLogout);
route.post("/verify", verifyTokenController.verifyToken)

module.exports = route;
