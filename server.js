const mongoose = require("mongoose");
const User = require("./User");

//如果是使用cloud的話 第一個參數就要放cloud給予的uri位置，在<password>的部分要改成自己的MongoDB密碼，才能成功連線。

//本地端預設： mongodb://127.0.0.1:27017/你自己的資料庫名稱

//cloud：mongodb+srv://Wei:<password>@cluster0.adryn.mongodb.net/?retryWrites=true&w=majority

mongoose.connect("mongodb://127.0.0.1:27017/testdb", () => {
  console.log("connected");
});

const createNewData = async () => {
  try {
    // 第一種建立資料的方法
    // const user = new User({ name: "Wei", age: 24 });
    // await user.save();

    //----------------------------------------

    //第二種建立資料的方法
    // const user = await User.create({
    //   name: "Wei",
    //   age: 24,
    //   email: "test@gmail.com",
    // });

    //一次新增多筆資料
    const user = await User.insertMany([
      {
        name: "Alex",
        age: 18,
        email: "test1122123@gmail.com",
      },
      {
        name: "Bob",
        age: 16,
        email: "test5577@gmail.com",
      },
    ]);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

createNewData();
