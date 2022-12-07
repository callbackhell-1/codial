const User = require("../models/user");

module.exports.profile = async function (req, res) {
  // find the user
  let user = await User.findById(req.params.id);

  // rendering view
  return res.render("users_profile", {
    title: "profile page",
    profile_user: user,
  });
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    let user = await User.findByIdAndUpdate(req.params.id, req.body);

    return res.redirect("back");
  } else {
    return res.status(401).send("Unauthorized");
  }
};

// sign up controller  & render sign up pg
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "codial | signup",
  });
};

// sign in controller & render sign in pg
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "codial | signIn",
  });
};

// get sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finiding user signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating user signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// to sign in data
module.exports.createSession = function (req, res) {
  req.flash("success","Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    req.flash("success","Logged out Successfully");
    return res.redirect("/");
  });
  next();
};

