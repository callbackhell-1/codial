const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookies
const session = require("express-session");
const passport = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongodb-session")(session);
const sassMiddleware = require("node-sass-middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// static files
app.use(express.static("./assets"));
// layout
app.use(expressLayouts);
// extract style and script from sub pages into the layouts.
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// using view
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(
  session({
    name: "codial",
    // TODO: change the secret before deployment in prod
    secret: "randomSomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // To DO error

    // store: new MongoStore(
    //   {
    //     mongooseConnection: db,
    //     autoRemove: "disabled",
    //   },
    //   function (err) {
    //     console.log(err || "connect-mongodb setup ok");
    //   }
    // ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error : ${err}`);
  }
  console.log(`Server is up & running on ${port}`);
});
