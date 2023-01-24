const express = require("express");
const accountController = require('../controllers/account/accountController');
const route = express.Router();

route.get("/basic-info/:id?", accountController.basicInfoGet)
route.post("/basic-info/:id?", accountController.basicInfoCreate)
route.put("/basic-info/:id?", accountController.basicInfoUpdate)
route.delete("/basic-info/:id?", accountController.basicInfoDelete)

route.get("/legal-info/:id?", accountController.legalInfoGet)
route.post("/legal-info/:id?", accountController.legalInfoCreate)
route.put("/legal-info/:id?", accountController.legalInfoUpdate)
route.delete("/legal-info/:id?", accountController.legalInfoDelete)

module.exports = route;

