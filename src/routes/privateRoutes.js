const express = require("express");
const route = express.Router();

const homeController = require("../controllers/homeController");
const logoutController = require("../controllers/logoutController");
route.get("/home", homeController.home);
route.get("/logout", logoutController.handleLogout);

module.exports = route;
