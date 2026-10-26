let bgImage;
let x, y;
let px, py; 
let brushSize; 
let drawColor; 
let palette; 
let previousButtons =[];

async function setup(){
 
 bgImage = await loadImage('media/hill.jpg');
   createCanvas(windowWidth,windowHeight);
  
  x = width/2;
  y = height/2;
  px = x;
  py = y;
  
  drawColor = color('0');
  strokeWeight(brushSize);
  textAlign(CENTER,CENTER);
  
}

function draw(){
   image(bgImage, 0, 0, width, height);
  let gp = navigator.getGamepads()[0];
  if(!gp){
    fill(0);
    noStroke();
    textSize(24);
    text("Connect a controller and press any button", width/2,height/2);
    return;
  
  }
  
  //left joystick 
  let deadzone = 0.15;
   let dx = abs(gp.axes[0]) > deadzone ? gp.axes[0] : 0;
  let dy = abs(gp.axes[1]) > deadzone ? gp.axes[1] : 0;
  
  let speed = 8;
  px = x; 
  py = y;
  
  x += dx * speed; 
  y += dy * speed;
  
  x = constrain(x, 0 , width);
  y = constrain(y, 0 , height);
  
  
  if (palette){
    drawColor= color('red', 'orange', 'black');
  }
  stroke(drawColor);
  strokeWeight(brushSize);
  
  line(px, py, x, y);
  
  //triggers
  let leftTrigger = gp.buttons[6].value;
  let rightTrigger = gp.buttons[7].value;
  
  brushSize = map(rightTrigger - leftTrigger, -1,1, 1, 30);
  
  brushSize = constrain(brushSize, 1, 30);
   
  handleButtons(gp);
  
}

function handleButtons(gp){
  gp.buttons.forEach((button,index) => {
    let currentlyPressed = button.pressed;
    let previouslyPressed = previousButtons[index] || false;
    
    //newly pressed
    if(currentlyPressed && !previouslyPressed){
      switch(index) {
          //B
        case 0: 
           ellipse(50, 50, 80, 80);
          fill('red');
            break;
          //A
        case 1: 
         drawColor = color( random(255), random(255), random(255));
          rainbow = false;
          break;
          
          // Y
        case 2: 
          palette = !palette;
          break;
        
          // X
        case 3: 
         
          break;
      }
      
    }
    
    previousButtons[index] = currentlyPressed;
    
  }); 
}