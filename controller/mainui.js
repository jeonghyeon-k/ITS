// 메인화면 출력파일
const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const router = express.Router();
var loglevel = 1;

const GetMainUI = (req, res) => {
  // 메인화면을 출력합니다
  let htmlstream = "";

  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8"); // 헤더부분
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8"); // 일반사용자메뉴
  htmlstream =
    htmlstream +
    fs.readFileSync(__dirname + "/../views/content.ejs", "utf8"); // Content
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8"); // Footer

  res.end(
    ejs.render(htmlstream, {
      title: "신호제어시스템",
      logurl: "/users/auth",
      loglabel: "로그인",
      regurl: "/users/reg"
    })
  );
};


const PuzzyUI = (req, res) => {
  // 메인화면을 출력합니다
  let htmlstream = "";


  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8"); // 헤더부분
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8"); // 일반사용자메뉴
  htmlstream =
    htmlstream +
    fs.readFileSync(__dirname + "/../views/puzzy.ejs", "utf8"); // Content
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8"); // Footer

  res.end(
    ejs.render(htmlstream, {
      title: "쇼핑몰site",
      logurl: "/users/auth",
      loglabel: "로그인",
      regurl: "/users/reg"
    })
  );
};


const SystemerrorUI = (req, res) => {
  // 메인화면을 출력합니다
  let htmlstream = "";


  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8"); // 헤더부분
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8"); // 일반사용자메뉴
  htmlstream =
    htmlstream +
    fs.readFileSync(__dirname + "/../views/systemerror.ejs", "utf8"); // Content
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8"); // Footer

  res.end(
    ejs.render(htmlstream, {
      title: "쇼핑몰site",
      logurl: "/users/auth",
      loglabel: "로그인",
      regurl: "/users/reg"
    })
  );
};


const MonitoringUI = (req, res) => {
  // 메인화면을 출력합니다
  let htmlstream = "";


  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8"); // 헤더부분
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8"); // 일반사용자메뉴
  htmlstream =
    htmlstream +
    fs.readFileSync(__dirname + "/../views/monitoring.ejs", "utf8"); // Content
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8"); // Footer

  res.end(
    ejs.render(htmlstream, {
      title: "쇼핑몰site",
      logurl: "/users/auth",
      loglabel: "로그인",
      regurl: "/users/reg"
    })
  );
};

const systemcontrolUI = (req, res) => {
  // 메인화면을 출력합니다
  let htmlstream = "";


  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8"); // 헤더부분
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8"); // 일반사용자메뉴
  htmlstream =
    htmlstream +
    fs.readFileSync(__dirname + "/../views/systemcontrol.ejs", "utf8"); // Content
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8"); // Footer

  res.end(
    ejs.render(htmlstream, {
      title: "쇼핑몰site",
      logurl: "/users/auth",
      loglabel: "로그인",
      regurl: "/users/reg"
    })
  );
};



// ‘/’ get 메소드의 핸들러를 정의
router.get("/", GetMainUI);
router.get("/puzzy", PuzzyUI);
router.get("/systemerror", SystemerrorUI);
router.get("/monitoring", MonitoringUI);
router.get("/systemcontrol", systemcontrolUI);

// 외부로 뺍니다.
module.exports = router;
