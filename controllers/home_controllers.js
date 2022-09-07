module.exports.home = function (req, res) {
  // return res.end("<h1>Express is Up & running for codial</h1>");

  // return view file
  return res.render("home", {
    title: "Home",
  });
};

// module.exports.profile = function (req, res) {
//   return res.end("<h1>Profile page is Loades</h1>");
// };
