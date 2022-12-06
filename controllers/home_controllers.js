const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  try {
    // populate user of each post
    let posts = await Post.find({})
      .populate("user") // In post.js this is user field hai
      .populate({
        path: "comments", //In post.js this is comments field hai
        populate: {
          path: "user",
        },
      });

    // We want all the user
    let users = await User.find({});

    // once we got "posts" & "users" we return it to browser
    return res.render("home", {
      title: "Codial | Home",
      posts: posts,
      all_user: users,
    });
  } catch (err) {
    console.log("error:", err);
  }
};
