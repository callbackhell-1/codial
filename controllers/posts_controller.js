const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash("success", "Post created");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", "error");
    return res.redirect("back");
  }
};
module.exports.destroy = async function (req, res) {
  try {
    //  Before deleting the post check post exist or not
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post and associated deleted !");
      return res.redirect("back");
    }
    // if (post.user == req.user.id) not match
    else {
      req.flash("error", "You can't delete this post");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", "error");
    return res.redirect("back");
  }
};
