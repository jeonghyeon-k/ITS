// 메인화면 출력파일
const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const router = express.Router();

const GetMainUI = (req, res) => {
  // 메인화면을 출력합니다
  let htmlstream = "";

  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8"); // 헤더부분
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8"); // 일반사용자메뉴
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/content.ejs", "utf8"); // Content
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8"); // Footer

    if (req.session.auth) {
        res.end(
            ejs.render(htmlstream, {
              logurl: "/users/logout",
              loglabel: "로그아웃",
              reglabel: req.session.who
            })
          );
      } else {
        res.end(
            ejs.render(htmlstream, {
              logurl: "/users/auth",
              loglabel: "로그인",
              reglabel: ""
            })
          );
      }
};

const PuzzyUI = (req, res) => {
  let htmlstream = "";

  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8"); // 헤더부분
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8"); // 일반사용자메뉴
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/puzzy.ejs", "utf8"); // Content
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8"); // Footer
  if (req.session.auth) {
    res.end(
        ejs.render(htmlstream, {
          logurl: "/users/logout",
          loglabel: "로그아웃",
          reglabel: req.session.who
        })
      );
  } else {
    res.end(
        ejs.render(htmlstream, {
          logurl: "/users/auth",
          loglabel: "로그인",
          reglabel: ""
        })
      );
  }
};

const DeveloperUI = (req, res) => {
  let htmlstream = "";

  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8"); // 헤더부분
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8"); // 일반사용자메뉴
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/developer.ejs", "utf8"); // Content
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8"); // Footer
  if (req.session.auth) {
    res.end(
        ejs.render(htmlstream, {
          logurl: "/users/logout",
          loglabel: "로그아웃",
          reglabel: req.session.who
        })
      );
  } else {
    res.end(
        ejs.render(htmlstream, {
          logurl: "/users/auth",
          loglabel: "로그인",
          reglabel: ""
        })
      );
  }
};

const AboutsystemUI = (req, res) => {
  let htmlstream = "";

  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8"); // 헤더부분
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8"); // 일반사용자메뉴
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/aboutsystem.ejs", "utf8"); // Content
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8"); // Footer
  if (req.session.auth) {
    res.end(
        ejs.render(htmlstream, {
          logurl: "/users/logout",
          loglabel: "로그아웃",
          reglabel: req.session.who
        })
      );
  } else {
    res.end(
        ejs.render(htmlstream, {
          logurl: "/users/auth",
          loglabel: "로그인",
          reglabel: ""
        })
      );
  }
};

// ‘/’ get 메소드의 핸들러를 정의
router.get("/", GetMainUI);
router.get("/puzzy", PuzzyUI);
router.get("/developer", DeveloperUI);
router.get("/aboutsystem", AboutsystemUI);

// 외부로 뺍니다.
module.exports = router;
