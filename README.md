# Mongoose-Note

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

在測試的過程中也強烈建議大家使用 nodemon 來監聽自己的 node js 檔案，當檔案有異動時，nodemon 會幫你 restart server，才不用每次做一點更動之後就要重新執行 node js 的檔案。

這邊先執行以下指令來安裝 mongoose：

```javascript
npm install mongoose
```

將套件安裝成功後，就來進行基本的連線設定吧，先建立一支新的檔案，名為 server.js。

```javascript
const mongoose = require("mongoose");

//如果是使用cloud的話 第一個參數就要放cloud給予的uri位置，在<password>的部分要改成自己的MongoDB密碼，才能成功連線。

//本地端預設： mongodb://127.0.0.1:27017/你自己的資料庫名稱

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

# 施工中 🚧
