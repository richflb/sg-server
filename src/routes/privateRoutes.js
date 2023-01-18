const express = require("express");
const route = express.Router();

const homeController = require("../controllers/homeController");
const accountController = require("../controllers/accountController");
const logoutController = require("../controllers/logoutController");

route.get("/home", homeController.home);
route.get("/account", accountController.account);
route.get("/logout", logoutController.handleLogout);
module.exports = route;
