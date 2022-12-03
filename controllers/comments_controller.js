const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    // if err
    if (err) {
      console.log("post not found");
    }

    // if post found
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          if (err) {
            console.log("error in creating comment");
          }
          post.comments.push(comment);
          post.save();

          res.redirect("/");
        }
      );
    }
  });
};
