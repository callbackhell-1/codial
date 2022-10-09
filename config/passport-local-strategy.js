const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find the user & establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding user --> Passport");
          return done(err);
        }
        // if user found
        if (!user || user.password != password) {
          console.log("invalid username/Password");
          return done(null, false);
        }
        // if user is found
        return done(null, user);
      });
    }
  )
);

// serializing the user to decide which key s to be kept in cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialising the user froom the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding user --> Passport");
      return done(err);
    }
    return done(null, done);
  });
});

// check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    // is user is signed in , then pass on the request to next function(controller's action)
if(req.isAuthenticated){
    return next();
}
// if the user is not authenticated
    return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated){
        // req.user contains the current signed in user from the session cookie & we are just sending this to the local for the views
         res.locals.user = req.user;
    }

    next();
};

module.exports = passport;
