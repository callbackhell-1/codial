const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controllers");
// const profileController = require("../controllers/home_controllers");

// "/" is the url, router.get is similar to app.get & homecontroller action.
router.get("/", homeController.home);

// router.get("/profile", profileController.profile);

console.log("Router Loaded...");
module.exports = router;
