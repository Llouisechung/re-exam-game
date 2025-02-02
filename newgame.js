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

    //start game button
    push();
    fill(255);
    rect(300, 250, 170, 50, 10);
    pop();

    //start game text
    push();
    fill(255,0,0);
    textSize(20);
    text("Press To Start", 325, 284);
    pop();
}
function gameWin () {
    push();
    background(0);
    fill(255);
    textSize(30);
    text ("You Won !!! ", 300, 150);
    pop();
}

function restart() {
    //restart button
    push();
    fill(255);
    rect(300, 250, 170, 50, 10);
    pop();
    //restart text
    push();
    fill(255,0,0);
    textSize(20);
    text("Restart Game", 325, 284);
    pop();
}

function gameLose() {
    push();
    background(0);
    fill(255);
    textSize(30);
    text ("You Lost, Try Again ", 250, 150);
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

class Obstacle {
    constructor (x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
  

}


//function level1() {
//design for level 1
//}

//function squareMethodsforward

//obsticle objects, färg(3) speed (3)
//const square1a = new squareForward();

//obsticle arrays
//let squareForward = []
//let squareBackwards

class road {
  constructor(x, y) {
    this.y = y;
    this.x = x;
  }
  draw() {
    push();
  }
}
function draw() {
  background(10, 100, 200);
  safeGround();
  startingGround();
  endingGround();
  character(x, y);

  if (gameState === "start") {
    startscreen();
   } else if(gameState === "playing") {
    gamePlay();
    }else if(gameState === "gameSucceeded"){
        gameWin();
        restart();
    } else if(gameState === "gameOver"){
        gameLose();
        restart();

    }

  }
  

