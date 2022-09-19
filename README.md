# Mongoose-Note Part 1

參考資料：

- [Mongoose Document](https://mongoosejs.com/docs/api.html)
- [Web Dev Simplified](https://www.youtube.com/watch?v=DZBGEVgL2eE)

# MongoDB 前置作業(本地端)

本篇主要是介紹 Mongoose 的語法，所以在安裝的部分並不會太詳細的介紹。

如果要使用本地端進行測試的話，必須先安裝以下兩個由官方提供的應用程式，分別是：

- [MongoDB Community Server](https://www.mongodb.com/try/download/community?tck=docs_server)
- [MongoDB Shell](https://www.mongodb.com/try/download/shell?jmp=docs)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (建議一同安裝)

另外也建議大家安裝 MongoDB Compass，它是由官網提供的圖形化桌面應用程式，我們可以直接在該應用程式看到所有儲存在資料庫的資料，並且可以針對資料進行新增修改刪除，在測試的過程中會比較方便。

![Image](https://i.imgur.com/xg8KhgB.png)

以上都安裝完以後，在 Terminal 輸入 mongosh，如果有成功連線代表安裝成功。

![Image](https://i.imgur.com/oz7dfby.png)

# MongoDB 前置作業(MongoDB Cloud)

而如果是使用 MongoDB Cloud(MongoDB Atlas)來進行開發的話，在建立完 Database 後，可以在後台的 Atlas 介面看到我們的 Cluster0，點擊 Connect。

![Image](https://i.imgur.com/2OVVKvZ.png)

之後點擊 Connect your application

![Image](https://i.imgur.com/VsRet1o.png)

我們只要先把 uri 那段複製起來就好，等等在初始化的部分需要使用到該 uri，記得在<password>的部分要改成自己的 MongoDB 密碼，密碼也要注意不要外洩，所以 uri 建議是儲存在.env。

![Image](https://i.imgur.com/rAKc2EJ.png)

# 初始化

在開發的過程中也強烈建議大家使用 nodemon 來監聽自己的 node js 檔案，當檔案有異動時，nodemon 會幫你 restart server，才不用每次做一點更動之後就要重新執行 node js 的檔案。

這邊先執行以下指令來安裝 mongoose：

```javascript
npm install mongoose
```

將套件安裝成功後，就來進行基本的連線設定吧，先建立一支新的檔案，名為 server.js，在 connect 的時候把 uri 填上，port 後面的斜線要填上你要建立的資料庫名稱，當我們對資料庫進行操作時才會建立該資料庫。

**_sever.js_**

```javascript
const mongoose = require("mongoose");

//如果是使用cloud的話 第一個參數就要放cloud給予的uri位置，在<password>的部分要改成自己的MongoDB密碼，才能成功連線。

//本地端預設： mongodb://127.0.0.1:27017/你要建立的資料庫名稱

//cloud：mongodb+srv://Wei:<password>@cluster0.adryn.mongodb.net/?retryWrites=true&w=majority

mongoose.connect("mongodb://127.0.0.1:27017/testdb", () => {
  console.log("connected");
});
```

之後打開 Terminal，輸入以下指令：

```
nodemon ./server.js
```

要是連線成功的話就會在 Terminal 看到 connected。

![Image](https://i.imgur.com/tZxDkri.png)

# MongoDB Compass (建議安裝)

本文章是使用本地端進行測試，先打開 MongoDB Compass 在一開始的 New Connection 中輸入 `mongodb://localhost:27017/` 然後按下 Connect。

![Image](https://i.imgur.com/kiWy2P2.png)

成功利用 Compass 連線至本地端的 MongoDB 後，可以在左邊的 Databases 看到預設有三個資料庫，但目前還沒有對資料庫進行任何的操作，所以不會看到我們建立的資料庫(testdb)。

![Image](https://i.imgur.com/r6ze9bc.png)

# 建立 Collections 定義 Schema 並新增資料到資料庫

我們現在可以透過 Mongoose 來建立資料庫的 Collection，如果你有使用過其他資料庫例如 Mysql，Collection 就像是 Table，而 Table 在建立時需要定義裡面的資料欄位名稱以及資料型態(Schema Type)，Collection 也是一樣。

要知道 Mongoose 支援哪些 Schema Type 的話可以看[官方的文檔](https://mongoosejs.com/docs/schematypes.html)，這裡就不多介紹了。

現在就來建立我們的 Collection 並定義 Schema 吧

我們再建立一支檔案名為 User.js，在該檔案裡面引入 mongoose 套件，並定義 Collection 名稱與欄位名稱。

**_User.js_**

```javascript
const mongoose = require("mongoose");

//定義欄位名稱與欄位型態
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

//定義Collection的名稱
module.exports = mongoose.model("User", userSchema);
```

定義好 Collection 名稱和 欄位名稱後，我們直接在 server.js 檔案中引入做使用，要注意的是 mongoose 提供的新增修改刪除都必須使用 async / await 去做處理，在建立新資料的時候填入剛剛定義的欄位名稱(key)還有欄位的值(value)。

**_server.js_**

```javascript
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
    const user = await User.create({
      name: "Wei",
      age: 24,
      email: "test@gmail.com",
    });
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

createNewData();
```

將上面的程式碼貼到 server.js 後儲存，因為我們是使用 nodemon 的關係，在按下儲存的當下 nodemon 就會幫我們重啟 server，如果沒有報出任何錯誤並且有在 Terminal 看到我們新增的資料，就代表資料建立成功了。

在 MongoDB Compass 中按下左邊的重新整理按鈕，就會看到我們的資料庫(testdb)和 collection 了(users)，而在 collection 裡面可以看到剛剛新增的資料。

![Image](https://i.imgur.com/WYFSDE8.png)

而如果要一次新增多筆資料的話就得使用 **insertMany**，差別在於傳入的參數必需用陣列包起來。

**_server.js_**

```javascript
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
```

如新增多筆資料成功的話，可以在 Terminal 看到剛剛新增的資料。

![Image](https://i.imgur.com/NOqYhra.png)

# 在 Schema 中進行資料驗證

在定義 Schema 的時候，通常會針對某些欄位進行驗證(validate)，例如：該欄位在新增時為必需的(required)、欄位最小值應為 1(min)，最大值為 100(max)等…。

而如果需針對欄位進行驗證，必需使用物件的方式來定義欄位屬性。

**_User.js_**

```javascript
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
    //email字串欄位最小長度應為10
    minLength: 10,
  },
  age: {
    type: Number,
    required: true,
    //age數字欄位最小值應為1
    min: 1,
  },
});

//定義Collection的名稱
module.exports = mongoose.model("User", userSchema);
```

接著到 server.js 修改一下資料的值

**_server.js_**

```javascript
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
    const user = await User.create({
      name: "Wei",
      age: -1,
      email: "test@gmail.com",
    });
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

createNewData();
```

按下儲存後，會發現 Terminal 報出錯誤訊息，原因是因為在 age 的欄位定義了規則，規定 age 欄位最小的值只能為 1，而建立的資料為-1。

![Image](https://i.imgur.com/UHUXy9w.png)

# Schema 自訂義規則

我們也可以在 Schema 中撰寫自己的欄位規則。

在 age 欄位中，我們建立了一個新屬性叫做 validate，在 validate 裡面需傳入 validator 以及 message，validtor 為你自己定義的欄位規則，在該欄位去判斷 age 傳進來的值是否為偶數，而當 validator 為 true 的時候才能通過驗證，如果驗證失敗，則會回傳 message。

**_User.js_**

```javascript
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
```

這邊將 age 的值改為奇數並儲存。

**_server.js_**

```javascript
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
    const user = await User.create({
      name: "Wei",
      age: 23, // 23 為奇數
      email: "test@gmail.com",
    });
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

createNewData();
```

儲存後會發現驗證失敗，因為 23 並不是偶數。

![Image](https://i.imgur.com/VxWsZcr.png)

<<<<<<< HEAD
# 查詢資料

經由前面新增的資料，資料庫內共有 3 筆資料，現在就來針對這 3 筆資料做查詢吧。

![Image](https://i.imgur.com/FbNuDDK.png)

# 更新資料

# 刪除資料

---

# 施工中 🚧
=======
>>>>>>> 931201b159a9adb41b9da12819ac344938af9fc0
