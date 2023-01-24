const express = require("express");
const profileController = require('../controllers/profile/profileController');
const route = express.Router();

route.get("/profile/:id?", profileController.profileGet)
route.post("/profile/:id?", profileController.profileCreate)
route.put("/profile/:id?", profileController.profileUpdate)
route.delete("/profile/:id?", profileController.profileDelete)

module.exports = route;