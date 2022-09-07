const express = require("express");
const app = express();
const port = 8000;

// use express router

app.use("/", require("./routes"));

// using view

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error : ${err}`);
  }
  console.log(`Server is up & running on ${port}`);
});
