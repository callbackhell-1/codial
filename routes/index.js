const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controllers");

// "/" is the url, router.get is similar to app.get & homecontroller action.
router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/aboutUs", require("./aboutus"));

console.log("Router Loaded...");
module.exports = router;
