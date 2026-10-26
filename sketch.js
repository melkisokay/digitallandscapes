
let mic;
let snowY = 0;
let hill;

let previousButtons =[];

function preload() {
  hill = loadImage('media/hill.jpg');
}


function setup () {
  createCanvas(800, 800);
  mic = new p5.AudioIn();
  background(220); 
  
  x = width/2;
  y = height/2;
  px = x;
  py = y;
  
}

function draw () {
 image(hill, 0, 0, width, height);
  
  let gp = navigator.getGamepads()[0];
  if(!gp){
    fill(0);
    noStroke();
    textSize(24);
    text("Connect a gamepad and press any button", width/2,height/2);
    return;
  }
let vol = mic.getLevel();
 let size = map(vol, 0, 1, 10, 300); //map volume to size
  
  snowY += 2 + vol * 100; //snowflake speed in response to volumne
  
  //snowflakes
  fill(255);
  noStroke();
  ellipse(width / 2, snowY, 10, 10);
  ellipse(10, snowY * 1.25, 20, 20); 
  ellipse(70, snowY, 10, 10); 
  ellipse(89, snowY * 1.25, 10, 10);
  ellipse(150, snowY +12 , 10, 10);
  ellipse(270, snowY + 3 , 20, 20);
  ellipse(300, snowY * 1.25 , 10, 10); 
  ellipse(390, snowY * 1.25 , 30, 30);
  
  ellipse(400, snowY * 1.25, 10, 10); 
  ellipse(430, snowY * 1.25, 10, 10);
  ellipse(470, snowY, 30, 30);
  ellipse(550, snowY * 1.25, 10, 10);
  ellipse(650, snowY +12 , 10, 10);
  ellipse(700, snowY + 3 , 30, 30);
  ellipse(750, snowY * 1.25 , 10, 10); 
  ellipse(780, snowY * 1.25 , 30, 30);
  
  ellipse(width / 2, snowY + 3, 10, 10);
  ellipse(10, snowY * 0.80, 20, 20); 
  ellipse(70, snowY * 0.90, 10, 10); 
  ellipse(89, snowY * 0.90, 10, 10);
  ellipse(150, snowY + 20 , 10, 10);
  ellipse(270, snowY + 30 , 20, 20);
  ellipse(300, snowY * 0.8 , 10, 10); 
  ellipse(390, snowY * 0.8 , 30, 30);
  
  ellipse(400, snowY * 0.70, 10, 10); 
  ellipse(430, snowY * 0.90, 10, 10);
  ellipse(470, snowY + 23, 30, 30);
  ellipse(550, snowY * 1.25, 10, 10);
  ellipse(650, snowY + 3 , 10, 10);
  ellipse(700, snowY + 9 , 30, 30);
  ellipse(750, snowY * 0.8 , 10, 10); 
  ellipse(780, snowY * 0.6 , 30, 30);
  
if (snowY > height) {
  snowY = 0;
}
  //body
  fill(255);
stroke(180);
ellipse(200, 330, 120, 120);
ellipse(200, 245, 90, 90);
ellipse(200, 180, 65, 65);
  
  //eyes
  fill(40);
noStroke();
ellipse(188, 175, 7, 7);
ellipse(212, 175, 7, 7);
  //nose
fill(255, 140, 30);
triangle(195, 183, 195, 193, 220, 187);
  //buttons
  ellipse(188, 175, 7, 7);
}

function mousePressed (){
  mic.start();
  userStartAudio();
}

