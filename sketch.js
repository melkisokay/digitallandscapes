let mic;
let snowY = 0;
let hill;
let tree;

let hasHat = false;
let hasArms = false;
let hasButtons = false;
let hasScarf = false;

let hatColor;
let scarfColor;

let treeW = 100;
let treeH = 100;

let volumeSlider;
let mySound;

let treeX, treeY, treePX, treePY;
let x, y, px, py;

let previousButtons = [];

function preload () {
  hill = loadImage('media/hill.jpg');
  mySound = loadSound('media/silentnight.mp3');
}

async function setup () {
  mic = new p5.AudioIn();
  background(220);
  createCanvas(windowWidth, windowHeight);

  tree = await loadImage('media/tree.gif');

  // volume slider was created with the help of google. createSlider(min, max, [value], [step])  https://p5js.org/reference/p5/createSlider/ 
  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  volumeSlider.position(20, 20); //gives the slider its position position([x], [y], [positionType]) https://p5js.org/reference/p5.Element/position/

  x = width / 2;
  y = height / 2;
  px = x;
  py = y;

  treeX = width / 2;
  treeY = height / 2;
  treePX = treeX;
  treePY = treeY;
}

function draw () {
  image(hill, 0, 0, width, height);
  image(tree, treeX, treeY, treeW, treeH); //links tree width and height to variables controlled by game pad

  let currentVolume = volumeSlider.value(); //creates variable currentVolume and links it to the slider we created above using the value parameter

  // Apply it to the sound
  mySound.setVolume(currentVolume); //applies the currentVolume as determined above by the volumeSlider to mySound

  // Display the current volume value on screen
  stroke('black');
  fill('black');
  strokeWeight(1);
  text("volume", 20, 60); // creates text under volume slider
  text('press A, B, X, Y to customize snowman', 20, 80);
  noFill();
  noStroke();

  let gp = navigator.getGamepads()[0];
  if (!gp) {
    fill(0);
    noStroke();
    textSize(20);
    text("Connect a gamepad and press any button", width / 2, height / 2);
    return;
  }

  handleButtons(gp);

  let vol = mic.getLevel();

  snowY += 2 + vol * 100; //snowflake speed in response to volume


  //snowflakes
  fill(255);
  noStroke();
  ellipse(width / 2, snowY, 10, 10);
  ellipse(10, snowY * 1.25, 20, 20);
  ellipse(70, snowY, 10, 10);
  ellipse(89, snowY * 1.25, 10, 10);
  ellipse(150, snowY + 12, 10, 10);
  ellipse(270, snowY + 3, 20, 20);
  ellipse(300, snowY * 1.25, 10, 10);
  ellipse(390, snowY * 1.25, 30, 30);

  ellipse(400, snowY * 1.25, 10, 10);
  ellipse(430, snowY * 1.25, 10, 10);
  ellipse(470, snowY, 30, 30);
  ellipse(550, snowY * 1.25, 10, 10);
  ellipse(650, snowY + 12, 10, 10);
  ellipse(700, snowY + 3, 30, 30);
  ellipse(750, snowY * 1.25, 10, 10);
  ellipse(780, snowY * 1.25, 30, 30);

  ellipse(width / 2, snowY + 3, 10, 10);
  ellipse(10, snowY * 0.80, 20, 20);
  ellipse(70, snowY * 0.90, 10, 10);
  ellipse(89, snowY * 0.90, 10, 10);
  ellipse(150, snowY + 20, 10, 10);
  ellipse(270, snowY + 30, 20, 20);
  ellipse(300, snowY * 0.8, 10, 10);
  ellipse(390, snowY * 0.8, 30, 30);

  ellipse(400, snowY * 0.70, 10, 10);
  ellipse(430, snowY * 0.90, 10, 10);
  ellipse(470, snowY + 23, 30, 30);
  ellipse(550, snowY * 1.25, 10, 10);
  ellipse(650, snowY + 3, 10, 10);
  ellipse(700, snowY + 9, 30, 30);
  ellipse(850, snowY * 0.8, 10, 10);
  ellipse(900, snowY * 0.6, 30, 30);

  ellipse(width / 2, snowY + 3, 10, 10);
  ellipse(1000, snowY * 0.80, 20, 20);
  ellipse(1050, snowY * 0.90, 10, 10);
  ellipse(1109, snowY * 0.90, 10, 10);
  ellipse(1150, snowY + 20, 10, 10);
  ellipse(1200, snowY + 30, 20, 20);
  ellipse(1270, snowY * 0.8, 10, 10);
  ellipse(1300, snowY * 0.8, 30, 30);

  ellipse(1350, snowY * 0.70, 10, 10);
  ellipse(1400, snowY * 0.90, 10, 10);
  ellipse(1420, snowY + 23, 30, 30);
  ellipse(1450, snowY * 1.25, 10, 10);
  ellipse(1500, snowY + 3, 10, 10);
  ellipse(1550, snowY + 9, 30, 30);
  ellipse(1630, snowY * 0.8, 10, 10);
  ellipse(1650, snowY * 0.6, 30, 30);



  if (snowY > height) {
    snowY = 0;
  }
  
  //body
  fill(255);
  stroke(180);
  ellipse(x, y + 100, 120, 120);
  ellipse(x, y + 50, 90, 90);
  ellipse(x, y + 0, 65, 65);

  //eyes
  fill(40);
  noStroke();
  ellipse(x + 10, y - 5, 7, 7);
  ellipse(x - 10, y - 5, 7, 7);

  //nose
  fill('orange');
  triangle(x - 3, y - 2, x - 3, y + 8, x + 18, y + 3);
  noFill();

  drawAccessories(); //function used to draw the randomized accessories

  //left joystick
  let deadzone = 0.15; //for drifting
  let dx = abs(gp.axes[0]) > deadzone ? gp.axes[0] : 0; //horizontal
  let dy = abs(gp.axes[1]) > deadzone ? gp.axes[1] : 0; //vertical

  let speed = 8;
  px = x;
  py = y;

  x += dx * speed;
  y += dy * speed;

  x = constrain(x, 0, width);
  y = constrain(y, 0, height);

  //right joystick
  let dRx = abs(gp.axes[2]) > deadzone ? gp.axes[2] : 0; //horizontal
  let dRy = abs(gp.axes[3]) > deadzone ? gp.axes[3] : 0; //vertical

  let speedR = 8;
  treePX = treeX;
  treePY = treeY;

  treeX += dRx * speedR;
  treeY += dRy * speedR;

  treeX = constrain(treeX, 0, width);
  treeY = constrain(treeY, 0, height);


}

function handleButtons (gp) {
  gp.buttons.forEach((button, index) => {
    let currentlyPressed = button.pressed;
    let previouslyPressed = previousButtons[index] || false;

    //newly pressed
    if (currentlyPressed && !previouslyPressed) {
      switch (index) {
        //A = hat
        case 0:
          hasHat = !hasHat;
          hatColor = color(random(255), random(255), random(255));
          break;

          //B = hat
        case 1:
          hasScarf = !hasScarf;
          scarfColor = color(random(255), random(255), random(255));
          break;

          // X = arms
        case 2:
          hasArms = !hasArms;
          break;

          // Y = buttons
        case 3:
          hasButtons = !hasButtons;
          break;
          
          //treeH increases with up arrow
          case 12:
         treeH += 20;
          break;
          
          //treeH decreases with down arrow
          case 13:
          treeH -= 20;
          break;
          
          //treeW increases with left arrow
          case 15:
         treeW += 20;
          break;
          
          //treeW decreases with right arrow
          case 14:
          treeW -= 20;
          break;
      }

    }

    previousButtons[index] = currentlyPressed;

  });
  
  
}

function drawAccessories () {
  //buttons
  if (hasButtons) {

    fill(40);
    stroke(180);
    ellipse(x, y + 40, 5, 5);
    ellipse(x, y + 60, 5, 5);
    ellipse(x, y + 80, 5, 5);
  }

  // hat
  if (hasHat) {
    fill(hatColor);
    stroke(40);
    strokeWeight(1);

    // Hat brim
    rect(x - 28, y - 27, 56, 8);

    // Hat top
    rect(x - 20, y - 55, 40, 30);
  }

  // scarf
  if (hasScarf) {
    stroke(scarfColor);
    strokeWeight(15);
    noFill();

    line(x - 35, y + 22, x + 35, y + 22);
    line(x + 20, y + 24, x + 28, y + 52);

    noStroke();
  }

  // arms
  if (hasArms) {
    stroke('brown');
    strokeWeight(5);

    // Left arm
    line(x - 45, y + 55, x - 95, y + 30);
    line(x - 80, y + 37, x - 90, y + 20);
    line(x - 80, y + 37, x - 100, y + 43);

    // Right arm
    line(x + 45, y + 55, x + 95, y + 30);
    line(x + 80, y + 37, x + 90, y + 20);
    line(x + 80, y + 37, x + 100, y + 43);

    noStroke();
    noFill();
  }
}


function mousePressed () {
  mic.start();
  if (!mySound.isPlaying()) { //prevents the song from being played twice using the is playing function in p5.js
    mySound.loop();
  }
}

// works to resize canvas to fit into window size, i got this from https://stackoverflow.com/questions/47125752/trying-to-get-responsive-window-and-shapes-using-p5-js
function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}