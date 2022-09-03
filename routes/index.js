const express = require("express");
const router = express.Router();

// To Load homecontoller file
const homeController = require("../controllers/home_controller");
// to check whether router file is loaded or not
console.log("Router is Loaded...");

//
router.get("/", homeController.home);

module.exports = router;
