module.exports.profile = function (req, res) {
  // rendering view
  return res.render("users_profile", {
    title: "profile page",
  });
};

// sign up controller  & render sign up pg
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "codial | signup",
  });
};

// sign in controller & render sign in pg
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "codial | signIn",
  });
};
