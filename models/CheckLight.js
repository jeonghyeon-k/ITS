const gpio = require('node-wiring-pi');

const LIGHT1 = 21;
const LIGHT2 = 22;
const LIGHT3 = 14;
const LIGHT4 = 30;
const LIGHT5 = 12;
const LIGHT6 = 13;

const LIGHT7 = 8;
const LIGHT8 = 9;
const LIGHT9 = 7;
const LIGHT10 = 0;
const LIGHT11 = 2;
const LIGHT12 = 3;

const LIGHT13 = 10;
const LIGHT14 = 6;
const LIGHT15 = 4;
const LIGHT16 = 5;
const LIGHT17 = 16;
const LIGHT18 = 16;

const LIGHT19 = 11;
const LIGHT20 = 31;
const LIGHT21 = 26;
const LIGHT22 = 27;
const LIGHT23 = 28;
const LIGHT24 = 29;



const CheckLight1 =function(){
    let data = gpio.digitalRead(LIGHT1);
    if(!data){
        return 0
       }
    else{
        return 1
    }
    
}
const CheckLight2 =function(){
    let data = gpio.digitalRead(LIGHT2);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight3 =function(){
    let data = gpio.digitalRead(LIGHT3);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight4 =function(){
    let data = gpio.digitalRead(LIGHT4);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight5 =function(){
    let data = gpio.digitalRead(LIGHT5);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight6 =function(){
    let data = gpio.digitalRead(LIGHT6);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight7 =function(){
    let data = gpio.digitalRead(LIGHT7);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight8 =function(){
    let data = gpio.digitalRead(LIGHT8);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight9 =function(){
    let data = gpio.digitalRead(LIGHT9);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight10 =function(){
    let data = gpio.digitalRead(LIGHT10);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight11 =function(){
    let data = gpio.digitalRead(LIGHT11);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight12 =function(){
    let data = gpio.digitalRead(LIGHT12);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight13 =function(){
    let data = gpio.digitalRead(LIGHT13);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight14 =function(){
    let data = gpio.digitalRead(LIGHT14);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight15 =function(){
    let data = gpio.digitalRead(LIGHT15);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight16 =function(){
    let data = gpio.digitalRead(LIGHT16);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight17 =function(){
    let data = gpio.digitalRead(LIGHT17);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight18 =function(){
    let data = gpio.digitalRead(LIGHT18);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight19 =function(){
    let data = gpio.digitalRead(LIGHT19);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight20 =function(){
    let data = gpio.digitalRead(LIGHT20);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight21 =function(){
    let data = gpio.digitalRead(LIGHT21);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight22 =function(){
    let data = gpio.digitalRead(LIGHT22);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight23 =function(){
    let data = gpio.digitalRead(LIGHT23);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}
const CheckLight24 =function(){
    let data = gpio.digitalRead(LIGHT24);
    if(!data){
        return 0
       }
    else{
        return 1
    }
}

process.on('SIGINT',function(){
    console.log("exit");
    process.exit();
});
const CheckRoad1 = function(){
    let Road1=CheckLight1()+CheckLight2()+CheckLight3()+CheckLight4()+CheckLight5()+CheckLight6()
    CheckLight1()
    CheckLight2()
    CheckLight3()
    CheckLight4()
    CheckLight5()
    CheckLight6()
    return Road1
}
const CheckRoad2 = function(){
    let Road2=CheckLight7()+CheckLight8()+CheckLight9()+CheckLight10()+CheckLight11()+CheckLight12()
    CheckLight7()
    CheckLight8()
    CheckLight9()
    CheckLight10()
    CheckLight11()
    CheckLight12()
    return Road2
}
const CheckRoad3 = function(){
    let Road3=CheckLight13()+CheckLight14()+CheckLight15()+CheckLight16()+CheckLight17()+CheckLight18()
    CheckLight13()
    CheckLight14()
    CheckLight15()
    CheckLight16()
    CheckLight17()
    CheckLight18()
    return Road3
}

const CheckRoad4 = function(){
    let Road4=CheckLight19()+CheckLight20()+CheckLight21()+CheckLight22()+CheckLight23()+CheckLight24()
    CheckLight19()
    CheckLight20()
    CheckLight21()
    CheckLight22()
    CheckLight23()
    CheckLight24()
    return Road4
}
const CheckLight = function(){
    let road1= CheckRoad1()
    let road2=CheckRoad2()
    let road3=CheckRoad3()
    let road4=CheckRoad4()
    console.log("road 1: "+ road1)
    console.log("road 2: "+ road2)
    console.log("road 3: "+ road3)
    console.log("road 4: "+ road4)
    setTimeout(CheckLight, 2000)
}


server.listen(65001, () => {
  gpio.wiringPiSetup();
  console.log("------------------------------------------------");
  console.log("조도센서측정및실시간모니터링웹서버");
  console.log("웹브라우져접속주소:http://IP주소:65001/");
  console.log("------------------------------------------------");
});

gpio.setup('wpi');
gpio.pinMode(LIGHT1,gpio.INPUT);
gpio.pinMode(LIGHT2,gpio.INPUT);
gpio.pinMode(LIGHT3,gpio.INPUT);
gpio.pinMode(LIGHT4,gpio.INPUT);
gpio.pinMode(LIGHT5,gpio.INPUT);
gpio.pinMode(LIGHT6,gpio.INPUT);
gpio.pinMode(LIGHT7,gpio.INPUT);
gpio.pinMode(LIGHT8,gpio.INPUT);
gpio.pinMode(LIGHT9,gpio.INPUT);
gpio.pinMode(LIGHT10,gpio.INPUT);
gpio.pinMode(LIGHT11,gpio.INPUT);
gpio.pinMode(LIGHT12,gpio.INPUT);
gpio.pinMode(LIGHT13,gpio.INPUT);
gpio.pinMode(LIGHT14,gpio.INPUT);
gpio.pinMode(LIGHT15,gpio.INPUT);
gpio.pinMode(LIGHT16,gpio.INPUT);
gpio.pinMode(LIGHT17,gpio.INPUT);
gpio.pinMode(LIGHT18,gpio.INPUT);
gpio.pinMode(LIGHT19,gpio.INPUT);
gpio.pinMode(LIGHT20,gpio.INPUT);
gpio.pinMode(LIGHT21,gpio.INPUT);
gpio.pinMode(LIGHT22,gpio.INPUT);
gpio.pinMode(LIGHT23,gpio.INPUT);
gpio.pinMode(LIGHT24,gpio.INPUT);
