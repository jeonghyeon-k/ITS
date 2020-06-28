// require
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

const mainUI = require("./controller/mainui");
const users = require('./controller/users');
const system = require('./controller/system');

const PORT = 3000;
const URI = "http://192.168.219.177";

app.set("views", path.join(__dirname, "views")); // views경로 설정
app.set("view engine", "ejs"); // view엔진 지정
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use('/users/auth',express.static("public"));
app.use('/system/systemcontrol',express.static("public"));
app.use('/system/monitoring',express.static("public"));
app.use(express.json());
app.use(
  session({
    key: "sid",
    secret: "secret key", // 세션id 암호화할때 사용
    resave: false, // 접속할때마다 id부여금지
    saveUninitialized: true
  })
); // 세션id사용전에는 발급금지


app.use("/", mainUI);
app.use('/users', users);
app.use('/system',system);


var server = app.listen(PORT, () => {
  console.log("============================");
  console.log(" 신호등제어시스템 웹 서버 ");
  console.log(" 웹브라우저접속주소 : " + URI + ":" + PORT);
  console.log("============================");
});

