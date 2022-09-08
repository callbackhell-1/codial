const mongoose = require("mongoose");

// Below is schema of user
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Telling mongoose that this is our model
const user = mongoose.model("user", userSchema);

module.exports = user;