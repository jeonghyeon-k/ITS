const fs = require("fs");
const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql");
const bodyParser = require("body-parser");
//const crypto = require("crypto");
const session = require("express-session");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));


const db = mysql.createConnection({
  host: "localhost", // DB서버 IP주소
  user: "root", // DB접속 아이디
  password: "1234", // DB암호
  database: "greenlight" //사용할 DB명
});

// ------------------------------------  로그인기능 --------------------------------------

// 로그인 화면을 웹브라우져로 출력합니다.
const PrintLoginForm = (req, res) => {
  let htmlstream = "";

  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8");
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8");
  htmlstream =
    htmlstream +
    fs.readFileSync(__dirname + "/../views/login_form.ejs", "utf8");
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });

  if (req.session.auth) {
    // true :로그인된 상태,  false : 로그인안된 상태
    res.end(
      ejs.render(htmlstream, {
        title: "쇼핑몰site",
        logurl: "/users/logout",
        loglabel: "로그아웃",
        reglabel: req.session.who
      })
    );
  } else {
    res.end(
      ejs.render(htmlstream, {
        title: "쇼핑몰site",
        logurl: "/users/auth",
        loglabel: "로그인",
        reglabel: ""
      })
    );
  }
};

// 로그인을 수행합니다. (사용자인증처리)
const HandleLogin = (req, res) => {
  let body = req.body;
  let userid, userpass, username;
  let sql_str;
  let htmlstream = "";
  let hashpwd = "";

  console.log("로그인 입력정보: %s, %s", body.uid, body.pass);
  if (body.uid == "" || body.pass == "") {
    console.log("아이디나 암호가 입력되지 않아서 로그인할 수 없습니다.");
    
    res
      .status(562)
      .end(
        '<meta charset="utf-8">아이디나 암호가 입력되지 않아서 로그인할 수 없습니다.'
      );
  } else {

    sql_str =
      "SELECT uid, pass, name from admin where uid ='" +
      body.uid +
      "' and pass='" +
      body.pass +
      "';";
    console.log("SQL: " + sql_str);
    db.query(sql_str, (error, results, fields) => {
      if (error) {
        res.status(562).end("Login Fail as No id in DB!");
      } else {
        if (results.length <= 0) {
          // select 조회결과가 없는 경우 (즉, 등록계정이 없는 경우)
          htmlstream = fs.readFileSync(
            __dirname + "/../views/alert.ejs",
            "utf8"
          );
          res.status(562).end(
            ejs.render(htmlstream, {
              title: "알리미",
              warn_title: "로그인 오류",
              warn_message: "등록된 계정이나 암호가 틀립니다.",
              return_url: "/"
            })
          );
        } else {
          // select 조회결과가 있는 경우 (즉, 등록사용자인 경우)
          results.forEach((item, index) => {
            userid = item.uid;
            userpass = item.pass;
            username = item.name;
            console.log("DB에서 로그인성공한 ID/암호:%s/%s", userid, userpass);
            if (body.uid == userid && item.pass == userpass) {
              req.session.auth = 99; // 임의로 수(99)로 로그인성공했다는 것을 설정함
              req.session.who = username; // 인증된 사용자명 확보 (로그인후 이름출력용)
              req.session.pass = item.pass;
              req.session.uid = item.uid;
              res.redirect("/");
            }
          }); /* foreach */
        } // else
      } // else
    });
  }
};

// REST API의 URI와 핸들러를 매핑합니다.
//  URI: http://xxxx/users/auth
router.get("/auth", PrintLoginForm); // 로그인 입력화면을 출력
router.post("/auth", HandleLogin); // 로그인 정보로 인증처리

// ------------------------------  로그아웃기능 --------------------------------------

const HandleLogout = (req, res) => {
  req.session.destroy(); // 세션을 제거하여 인증오작동 문제를 해결
  res.redirect("/"); // 로그아웃후 메인화면으로 재접속
};

// REST API의 URI와 핸들러를 매핑합니다.
router.get("/logout", HandleLogout); // 로그아웃 기능

module.exports = router;
