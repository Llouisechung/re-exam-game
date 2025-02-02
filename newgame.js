let x = 400;
let y = 570;
let gameState ="playing";

function setup() {
  createCanvas(800, 600);
  background(10, 100, 200);
  noStroke();
}
function character(x, y) {
  push();
  fill(250);
  ellipse(x, y, 40

  );
  pop();
}
function safeGround() {
  //Safe grounds between the starting and end ground
  push();
  fill(100);
  rect(0, 300, width, 80);
  push();

  push();
  fill(100);
  rect(0, 150, width, 70);
  push();
}

function startingGround() {
  //starting ground
  push();

  fill(169, 169, 169);
  rect(0, height - 70, width, 80);
  pop();
}

function endingGround() {
  //goal
  push();

  fill(169, 169, 169);
  rect(0, 0, width, 70);
  pop();
}

function startscreen () {
    push();
    background(0);
    fill(255);
    textSize(30);
    text ("Skipper Game", 300, 150);
    pop();

  
}
function gameWin () {
    push();
    background(0);
    fill(255);
    textSize(30);
    text ("You Succeeded! ", 300, 150);
    pop();
}

function gameLose() {
    push();
    background(0);
    fill(255);
    textSize(30);
    text ("You Have Lost", 300, 150);
    pop();
}
function gamePlay() {
    character(x,y);

    if (keyIsPressed) {
    if (keyCode === UP_ARROW) {
        y-= 5;
    }
    if (keyCode === DOWN_ARROW) {
        y+= 5;
    }
    if  (keyCode === LEFT_ARROW) {
        x-= 5;
    }
    if (keyCode === RIGHT_ARROW) {
        x+= 5;
    }
  }
}


class Button {
    constructor(x, y, width, height, text) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
    }
    draw() {
        push();
        translate(this.x+120, this.y);
        noStroke();
        fill(255);
        rect(0, 0, this.width+60, this.height, this.height /4);


        //define text
        fill(255, 0, 0);
        textSize(this.height / 2);
        textAlign(CENTER, CENTER);
        text(this.text, this.width-20, this.height /2);
        pop();
    }  
}

const startButton = new Button(200, 200, 100, 50, "Press to start");
const homescreen = new Button(200, 200, 100, 50, "Homescreen");
const restartButton = new Button(200, 200, 100, 50, "Restart Game");


class Obstacle {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
    }
  
  


const obstacle1 = new Obstacle();


//function level1() { 
//design for level 1
//}

//function squareMethodsforward

//obsticle objects, färg(3) speed (3)


//obsticle arrays
//let squareForward = []
//let squareBackwards


function draw() {
  background(10, 100, 200);
  safeGround();
  startingGround();
  endingGround();
  character(x, y);

  if (gameState === "start") {
    startscreen();
    startButton.draw();
   } else if(gameState === "playing") {
    gamePlay();
    }else if(gameState === "gameSucceeded"){
        gameWin();
        homescreen.draw();
    } else if(gameState === "gameOver"){
        gameLose();
       restartButton.draw();

    }

    //loops the obstacle 


  }
  

