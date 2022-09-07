module.exports.profile = function (req, res) {
  // return res.end("<h1>User Profile</h1> ");

  // rendering view

  return res.render("users_profile",{
    title:"profile page"
  });

  // users --> view file name.
};
