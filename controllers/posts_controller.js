const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating post");
        return;
      }
      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  //  Before deleting the post check post exist or not
  Post.findById(req.params.id, function (err, post) {
if (post.user == req.user.id) {
      post.remove();

      Comment.deleteMany({ post: req.params.id }, function (err) {
        if (err) {
          console.log("Error in deleting comment");
        }
        return res.redirect("back");
      });
    }
    // if (post.user == req.user.id) not match
    else{
      return res.redirect('back');
  }
  });
};
