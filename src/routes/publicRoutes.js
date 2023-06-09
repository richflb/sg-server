const express = require("express");
const route = express.Router();
const homeController = require("../controllers/homeController");
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const profileController = require('../controllers/profile/profileController');

const recSenhaController = require("../controllers/recSenhaController");
const refreshTokenController = require("../controllers/refreshTokenController");
const tourSearch = require("../controllers/manage-tours/toursController");

route.get("/", homeController.home);
route.post("/sign-up", signupController.signUp);
route.post("/login", loginController.handleLogin);

route.get('/refresh', refreshTokenController.handleRefreshToken);
route.get("/rec-senha", recSenhaController.recSenha);
route.get("/rec-senha-email", recSenhaController.recSenhaEmail);

route.get("/tour-guide/:id?", profileController.profileGet)

route.get("/seach/tours", tourSearch.getAllTours);

module.exports = route;
