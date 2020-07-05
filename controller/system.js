// 메인화면 출력파일
const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const http = require("http");
const socketio = require("socket.io");
const router = express.Router();

const app = express();

const server = http.createServer(app);
const io = socketio.listen(server);

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "192.168.0.14", // DB서버 IP주소
  user: "root", // DB접속 아이디
  password: "1234", // DB암호
  database: "greenlight" //사용할 DB명
});

const gpio = require("node-wiring-pi");
//ROAD 1
const LIGHT1 = 21;
const LIGHT2 = 22;
const LIGHT3 = 14;
const LIGHT4 = 30;
const LIGHT5 = 12; //반대로 인식
const LIGHT6 = 13;

//ROAD 2
const LIGHT7 = 8;
const LIGHT8 = 9;
const LIGHT9 = 7;
const LIGHT10 = 0;
const LIGHT11 = 2;
const LIGHT12 = 3;

//ROAD 3
const LIGHT13 = 10;
const LIGHT14 = 6; //빛감지를 못함 항상 어두움
const LIGHT15 = 4;
const LIGHT16 = 5;
const LIGHT17 = 16;
const LIGHT18 = 15;

//ROAD 4
const LIGHT19 = 11;
const LIGHT20 = 31;
const LIGHT21 = 26;
const LIGHT22 = 27;
const LIGHT23 = 28;
const LIGHT24 = 29; //작동안함

let road1_1 = 0;
let road1_2 = 0;
let road2_1 = 0;
let road2_2 = 0;
let road3_1 = 0;
let road3_2 = 0;
let road4_1 = 0;
let road4_2 = 0;

let timerid1,
  timerid2,
  timerid3,
  timerid4,
  timerid5,
  timerid6,
  timerid7,
  timerid8;

let Patterntime = new Array();

let pattern = new Array();

const SystemerrorUI = (req, res) => {
  if (req.session.auth) {
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
        logurl: "/users/logout",
        loglabel: "로그아웃",
        reglabel: req.session.who
      })
    );
  } else {
    // (로그인하지 않고) 본 페이지를 참조하면 오류를 출력
    htmlstream = fs.readFileSync(__dirname + "/../views/alert.ejs", "utf8");
    res.status(562).end(
      ejs.render(htmlstream, {
        title: "알리미",
        warn_title: "로그인 필요",
        warn_message: "관리메뉴를 사용하려면 로그인이 필요합니다.",
        return_url: "/users/auth/",
        warn_button: "로그인하기"
      })
    );
  }
};

const MonitoringUI = (req, res) => {
  if (req.session.auth) {
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
        logurl: "/users/logout",
        loglabel: "로그아웃",
        reglabel: req.session.who,
        warn_button: "로그인하기"
      })
    );
  } else {
    // (로그인하지 않고) 본 페이지를 참조하면 오류를 출력
    htmlstream = fs.readFileSync(__dirname + "/../views/alert.ejs", "utf8");
    res.status(562).end(
      ejs.render(htmlstream, {
        title: "알리미",
        warn_title: "로그인 필요",
        warn_message: "관리메뉴를 사용하려면 로그인이 필요합니다.",
        return_url: "/users/auth/",
        warn_button: "로그인하기"
      })
    );
  }
};

const systemcontrolUI = (req, res) => {
  if (req.session.auth) {
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
        logurl: "/users/logout",
        loglabel: "로그아웃",
        reglabel: req.session.who
      })
    );
  } else {
    // (로그인하지 않고) 본 페이지를 참조하면 오류를 출력
    htmlstream = fs.readFileSync(__dirname + "/../views/alert.ejs", "utf8");
    res.status(562).end(
      ejs.render(htmlstream, {
        title: "알리미",
        warn_title: "로그인 필요",
        warn_message: "관리자 메뉴를 사용하려면 로그인이 필요합니다.",
        return_url: "/users/auth/",
        warn_button: "로그인하기"
      })
    );
  }
};

const systemcontrol = (req, res) => {
  let body = req.body;
  let msg = body.msg;
  console.log("메시지 : " + msg);
  res.redirect("/system/systemcontrol");
  controlsignal(msg);
};

const settime = (req, res) => {
  let body = req.body;
  let time = new Array();
  time[0] = body.time1;
  time[1] = body.time2;
  time[2] = body.time3;
  time[3] = body.time4;
  time[4] = body.time5;
  time[5] = body.time6;
  time[6] = body.time7;
  time[7] = body.time8;
  for (let i = 0; i < 8; i++) {
    if (time[i] == "") {
      time[i] = 5;
    }
  }
  for (let i = 0; i < 8; i++) {
    sql_str =
      "UPDATE road SET lighttime = " +
      time[i] +
      " WHERE road_id = " +
      (i + 1) +
      ";";
    //console.log("SQL: " + sql_str);
    db.query(sql_str, (error, results, fields) => {
      if (error) {
        console.log("light UPATE ERROR !!");
      }
    });
  }
  console.log("light UPATE 성공 !!");

  res.redirect("/system/systemcontrol");
};

const controlsignal = function(msg) {
  const CheckLight1 = function() {
    let data = gpio.digitalRead(LIGHT1);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight2 = function() {
    let data = gpio.digitalRead(LIGHT2);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight3 = function() {
    let data = gpio.digitalRead(LIGHT3);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight4 = function() {
    let data = gpio.digitalRead(LIGHT4);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };

  //반대로 인식중
  const CheckLight5 = function() {
    let data = gpio.digitalRead(LIGHT5);
    if (!data) {
      return 1;
    } else {
      return 0;
    }
  };
  const CheckLight6 = function() {
    let data = gpio.digitalRead(LIGHT6);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight7 = function() {
    let data = gpio.digitalRead(LIGHT7);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight8 = function() {
    let data = gpio.digitalRead(LIGHT8);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight9 = function() {
    let data = gpio.digitalRead(LIGHT9);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight10 = function() {
    let data = gpio.digitalRead(LIGHT10);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight11 = function() {
    let data = gpio.digitalRead(LIGHT11);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight12 = function() {
    let data = gpio.digitalRead(LIGHT12);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight13 = function() {
    let data = gpio.digitalRead(LIGHT13);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  //빛감지 불가
  const CheckLight14 = function() {
    let data = gpio.digitalRead(LIGHT14);
    if (!data) {
      return 0;
    } else {
      return 0;
    }
  };
  const CheckLight15 = function() {
    let data = gpio.digitalRead(LIGHT15);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight16 = function() {
    let data = gpio.digitalRead(LIGHT16);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight17 = function() {
    let data = gpio.digitalRead(LIGHT17);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight18 = function() {
    let data = gpio.digitalRead(LIGHT18);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight19 = function() {
    let data = gpio.digitalRead(LIGHT19);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight20 = function() {
    let data = gpio.digitalRead(LIGHT20);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight21 = function() {
    let data = gpio.digitalRead(LIGHT21);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight22 = function() {
    let data = gpio.digitalRead(LIGHT22);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };
  const CheckLight23 = function() {
    let data = gpio.digitalRead(LIGHT23);
    if (!data) {
      return 0;
    } else {
      return 1;
    }
  };

  //작동안함
  const CheckLight24 = function() {
    let data = gpio.digitalRead(LIGHT24);
    if (!data) {
      return 0;
    } else {
      return 0;
    }
  };

  const CheckRoad1_1 = function() {
    let Road1_1 = CheckLight1() + CheckLight3() + CheckLight5();
    return Road1_1;
  };
  const CheckRoad1_2 = function() {
    let Road1_2 = CheckLight2() + CheckLight4() + CheckLight6();
    return Road1_2;
  };
  const CheckRoad2_1 = function() {
    let Road2_1 = CheckLight8() + CheckLight9() + CheckLight12();
    return Road2_1;
  };
  const CheckRoad2_2 = function() {
    let Road2_2 = CheckLight7() + CheckLight10() + CheckLight11();
    return Road2_2;
  };
  const CheckRoad3_1 = function() {
    let Road3_1 = CheckLight13() + CheckLight15() + CheckLight16();
    return Road3_1;
  };
  const CheckRoad3_2 = function() {
    let Road3_2 = CheckLight14() + CheckLight17() + CheckLight18();

    return Road3_2;
  };

  const CheckRoad4_1 = function() {
    let Road4_1 = CheckLight20() + CheckLight21() + CheckLight22();

    return Road4_1;
  };
  const CheckRoad4_2 = function() {
    let Road4_2 = CheckLight19() + CheckLight23() + CheckLight24();
    return Road4_2;
  };

  const Patterntimer1 = function() {
    Patterntime[0] = Patterntime[0] + 1;
    timerid1 = setTimeout(Patterntimer1, 1000);
  };

  const Patterntimer2 = function() {
    Patterntime[1] = Patterntime[1] + 1;
    timerid2 = setTimeout(Patterntimer2, 1000);
  };

  const Patterntimer3 = function() {
    Patterntime[2] = Patterntime[2] + 1;
    timerid3 = setTimeout(Patterntimer3, 1000);
  };

  const Patterntimer4 = function() {
    Patterntime[3] = Patterntime[3] + 1;
    timerid4 = setTimeout(Patterntimer4, 1000);
  };

  const Patterntimer5 = function() {
    Patterntime[4] = Patterntime[4] + 1;
    timerid5 = setTimeout(Patterntimer5, 1000);
  };

  const Patterntimer6 = function() {
    Patterntime[5] = Patterntime[5] + 1;
    timerid6 = setTimeout(Patterntimer6, 1000);
  };

  const Patterntimer7 = function() {
    Patterntime[6] = Patterntime[6] + 1;
    timerid7 = setTimeout(Patterntimer7, 1000);
  };

  const Patterntimer8 = function() {
    Patterntime[7] = Patterntime[7] + 1;
    timerid8 = setTimeout(Patterntimer8, 1000);
  };

  const CheckTimer = function(
    pattern1,
    pattern2,
    pattern3,
    pattern4,
    pattern5,
    pattern6,
    pattern7,
    pattern8
  ) {
    if (pattern1 > 0) {
      Patterntimer1();
    } else {
      clearTimeout(timerid1);
      Patterntime[0] = 0;
    }

    if (pattern2 > 0) {
      Patterntimer2();
    } else {
      clearTimeout(timerid2);
      Patterntime[1] = 0;
    }

    if (pattern3 > 0) {
      Patterntimer3();
    } else {
      clearTimeout(timerid3);
      Patterntime[2] = 0;
    }

    if (pattern4 > 0) {
      Patterntimer4();
    } else {
      clearTimeout(timerid4);
      Patterntime[3] = 0;
    }

    if (pattern5 > 0) {
      Patterntimer5();
    } else {
      clearTimeout(timerid5);
      Patterntime[4] = 0;
    }

    if (pattern6 > 0) {
      Patterntimer6();
    } else {
      clearTimeout(timerid6);
      Patterntime[5] = 0;
    }

    if (pattern7 > 0) {
      Patterntimer7();
    } else {
      clearTimeout(timerid7);
      Patterntime[6] = 0;
    }

    if (pattern8 > 0) {
      Patterntimer8();
    } else {
      clearTimeout(timerid8);
      Patterntime[7] = 0;
    }
  };
  const cleartimer = function() {
    for (let i = 0; i < 8; i++) {
      Patterntime[i] = 0;
    }
  };

  var rank = new Array();
  var rankpattern = new Array();
  const CheckLight = function() {
    road1_1 = CheckRoad1_1();
    road1_2 = CheckRoad1_2();
    road2_1 = CheckRoad2_1();
    road2_2 = CheckRoad2_2();
    road3_1 = CheckRoad3_1();
    road3_2 = CheckRoad3_2();
    road4_1 = CheckRoad4_1();
    road4_2 = CheckRoad4_2();

    // console.log("road 1 직진차량   : " + road1_1);
    // console.log("road 1 좌회전차량 : " + road1_2);
    // console.log("road 2 직진차량   : " + road2_1);
    // console.log("road 2 좌회전차량 : " + road2_2);
    // console.log("road 3 직진차량   : " + road3_1);
    // console.log("road 3 좌회전차량 : " + road3_2);
    // console.log("road 4 직진차량   : " + road4_1);
    // console.log("road 4 좌회전차량 : " + road4_2);
    // console.log("------------");

    pattern[0] = road2_1 + road4_1;
    pattern[1] = road1_1 + road3_1;
    pattern[2] = road2_1 + road2_2;
    pattern[3] = road3_1 + road3_2;
    pattern[4] = road1_1 + road1_2;
    pattern[5] = road4_1 + road4_2;
    pattern[6] = road2_2 + road4_2;
    pattern[7] = road1_2 + road3_2;
    CheckTimer(
      pattern[0],
      pattern[1],
      pattern[2],
      pattern[3],
      pattern[4],
      pattern[5],
      pattern[6],
      pattern[7]
    );

    for (let i = 0; i < 8; i++) {
      rankpattern[i] = Patterntime[i] + pattern[i];
    }

    //순위 구하기
    for (let i = 0; i < 8; i++) {
      let cnt = 1;
      if (rankpattern[i] == 0) {
        rank[i] = 0; // 차량대수가 0 이면 순위도 0
      } else {
        for (let j = 0; j < 8; j++) {
          if (rankpattern[i] < rankpattern[j]) {
            cnt++;
          }
        }
        rank[i] = cnt;
      }
    }

    //동점자 처리
    for (let i = 1; i < 9; i++) {
      let flag = 0;
      for (let j = 0; j < 8; j++) {
        if (rank[j] == i) {
          if (flag == 0) {
            flag = flag + 1;
          } else if (flag > 0) {
            rank[j] = rank[j] + 1;
          }
        }
      }
    }

    for (let i = 0; i < 8; i++) {
      sql_str1 =
        "UPDATE road SET  count = " +
        pattern[i] +
        " WHERE road_id = " +
        (i + 1) +
        ";";
      //console.log("SQL: " + sql_str);
      db.query(sql_str1, (error, results, fields) => {
        if (error) {
          console.log("PATTERN UPATE ERROR !!");
        }
      });
      sql_str2 =
        "UPDATE road SET lighttime = " +
        pattern[i] +
        " WHERE road_id = " +
        (i + 1) +
        ";";
      //console.log("SQL: " + sql_str);
      db.query(sql_str2, (error, results, fields) => {
        if (error) {
          console.log("light UPDATE ERROR !!");
        }
      });
      sql_str3 =
      "UPDATE road SET rank = " +
      rank[i] +
      " WHERE road_id = " +
      (i + 1) +
      ";";
    //console.log("SQL: " + sql_str);
    db.query(sql_str3, (error, results, fields) => {
      if (error) {
        console.log("rank UPDATE ERROR !!");
      }
    });
    }
    //console.log("rank UPDATE 성공 !!");

    for (let i = 0; i < 8; i++) {
      console.log(
        " 행시 " +
          (i + 1) +
          " : " +
          pattern[i] +
          " waited : " +
          Patterntime[i] +
          " rank : " +
          rank[i]
      );
    }

    cleartimer(); // DB 업데이트가 끝나면 시간초는 리셋 !!
    console.log("------------");
    timeid = setTimeout(CheckLight, 5000);
  };

  if (msg == "startmsg") {
    CheckLight();
  }
  if (msg == "stopmsg") {
    clearTimeout(timeid);
  }

  process.on("SIGINT", function() {
    console.log("exit");
    process.exit();
  });

  gpio.setup("wpi");
  gpio.pinMode(LIGHT1, gpio.INPUT);
  gpio.pinMode(LIGHT2, gpio.INPUT);
  gpio.pinMode(LIGHT3, gpio.INPUT);
  gpio.pinMode(LIGHT4, gpio.INPUT);
  gpio.pinMode(LIGHT5, gpio.INPUT);
  gpio.pinMode(LIGHT6, gpio.INPUT);
  gpio.pinMode(LIGHT7, gpio.INPUT);
  gpio.pinMode(LIGHT8, gpio.INPUT);
  gpio.pinMode(LIGHT9, gpio.INPUT);
  gpio.pinMode(LIGHT10, gpio.INPUT);
  gpio.pinMode(LIGHT11, gpio.INPUT);
  gpio.pinMode(LIGHT12, gpio.INPUT);
  gpio.pinMode(LIGHT13, gpio.INPUT);
  gpio.pinMode(LIGHT14, gpio.INPUT);
  gpio.pinMode(LIGHT15, gpio.INPUT);
  gpio.pinMode(LIGHT16, gpio.INPUT);
  gpio.pinMode(LIGHT17, gpio.INPUT);
  gpio.pinMode(LIGHT18, gpio.INPUT);
  gpio.pinMode(LIGHT19, gpio.INPUT);
  gpio.pinMode(LIGHT20, gpio.INPUT);
  gpio.pinMode(LIGHT21, gpio.INPUT);
  gpio.pinMode(LIGHT22, gpio.INPUT);
  gpio.pinMode(LIGHT23, gpio.INPUT);
  gpio.pinMode(LIGHT24, gpio.INPUT);
};

// ‘/’ get 메소드의 핸들러를 정의
router.get("/systemerror", SystemerrorUI);
router.get("/monitoring", MonitoringUI);
router.get("/systemcontrol", systemcontrolUI);
router.post("/systemcontrol", systemcontrol);
router.post("/time", settime);

// 외부로 뺍니다.
module.exports = router;
