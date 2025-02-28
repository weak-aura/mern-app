const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {type: String, unique: true, required:true},
  username: {type: String, required:true, minLength: 4},
  password: {type: String, required:true, minLength: 6},
  confirmPassword: {type: String, minLength: 6},
  verifyCode: {type: String}
}, {timestamps: true})

const User = mongoose.model("users", userSchema);
module.exports.UserModel = User;