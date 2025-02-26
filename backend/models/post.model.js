const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {type: Object},
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  title: {type: String, required:true},
  description: {type: String, required:true},
  imageUrl: {type: String}
},{timestamps: true})

const post = mongoose.model("posts", postSchema);
module.exports.PostModel = post;