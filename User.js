const mongoose = require("mongoose");

//定義欄位名稱與欄位型態
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: String,
});

//定義Collection的名稱
module.exports = mongoose.model("User", userSchema);
