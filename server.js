const mongoose = require("mongoose");

//如果是使用cloud的話 第一個參數就要放cloud給予的uri位置，在<password>的部分要改成自己的MongoDB密碼，才能成功連線。

//本地端預設： mongodb://127.0.0.1:27017/你自己的資料庫名稱

//cloud：mongodb+srv://Wei:<password>@cluster0.adryn.mongodb.net/?retryWrites=true&w=majority

mongoose.connect("mongodb://127.0.0.1:27017/testdb", () => {
  console.log("connected");
});
