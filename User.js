const mongoose = require("mongoose");

//定義欄位名稱與欄位型態
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      // validator為true時，才能通過驗證。
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} 並不是偶數`,
    },
  },
});

//定義Collection的名稱
module.exports = mongoose.model("User", userSchema);
