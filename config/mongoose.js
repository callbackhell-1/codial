const mongoose = require("mongoose");

// connetion to db
mongoose.connect("mongodb://localhost/codial_development");

const db = mongoose.connection;

// for error

db.on("error", console.log.bind(console, "Error in DB connection"));

// once connected to db
db.once("open", function () {
  console.log("connected to DB:: MongoDB");
});

// To make this module usable we need to export it

module.exports = db;
