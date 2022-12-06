const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (error) {
    console.log("Error :", error);
    return;
  }
};
module.exports.destroy = async function (req, res) {
  try {
    //  Before deleting the post check post exist or not
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      return res.redirect("back");
    }
    // if (post.user == req.user.id) not match
    else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error :", error);
  }
};
