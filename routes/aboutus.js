const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/about_controller");


router.get("/about",aboutController.about);

module.exports = router;