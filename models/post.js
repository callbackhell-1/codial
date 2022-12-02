const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // post linking to user & need to refer to user schema. ObjectId in robo3t & always unique.
    // ref : refer to which schema.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // when we loading the post we need to require all the comment on the post.
    // include the array of id's of all the comments in this post schema itself
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
