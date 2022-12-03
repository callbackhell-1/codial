const Post = require("../models/post");
module.exports.home = function (req, res) {
  // return res.end("<h1>Express is Up & running for codial</h1>");
  //see the cookies
  // console.log(req.cookies);
  // res.cookie("user_id", 222);
  // return view file
  // return id
  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Codial | Home",
  //     posts: posts,
  //   });
  // });
  // populate the user of each post
  Post.find({})
    .populate("user") // post.js me ye user field hai
    .populate({
      path: "comments", //post.js me ye comments hai
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Codial | Home",
        posts: posts,
      });
    });
};

// module.exports.profile = function (req, res) {
//   return res.end("<h1>Profile page is Loades</h1>");
// };
