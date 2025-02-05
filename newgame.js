let startX = 400;
let startY = 570;
let gameState = "start";
let startLives = 2;
let gameLives = startLives;
let score = 0;


//line 9 of the code is added by courtesy of Stefan La
let logSafeAreaBoarderWidth = 10;

function setup() {
  createCanvas(800, 600);
  background(100);
  noStroke();
}

class character {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    push();
    fill(250);
    square(this.x, this.y, this.width);
    pop();
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

  
  update() {
  // The following 10 lines of the code is added by ourtesy of Stefan La

  //checking if character moves with the log otherwise character dies
  let onLog = false;
  
  if (this.y < 200 && this.y > 100) {
   for (let i = 0; i < logs.length; i++) {
    let currentLog = logs[i];

  if (
    this.x + this.width > currentLog.x + logSafeAreaBoarderWidth &&
    this.x < currentLog.x + currentLog.width - logSafeAreaBoarderWidth
  ) 
  {
 //character moves with the log if character is on it
    this.x -= currentLog.speed;
    onLog = true;
  }
 }

 //character dies if fallen into water
if (!onLog) {
  console.log("DROWNED");
  if (gameLives === 0) {
    gameState = "gameOver";
  } else {
    gameLives -= 1;
    this.x = startX;
    this.y = startY;
  }
 }

}
  if (keyIsDown(UP_ARROW)) {
    this.move(0, -5);
  }
  if (keyIsDown(DOWN_ARROW)) {
    this.move(0, 5);
  }
  if (keyIsDown(LEFT_ARROW)) {
    this.move(-5, 0);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    this.move(5, 0);
  }


    //player gains a point, after 3 points player wins. 
     if (this.y < 40) {
      score++;
      character1.x = startX;
      character1.y = startY;
     }
     if(score === 3) {
      gameState = "gameSucceeded";
     }  
    
    }
 }

const character1 = new character(350, 550, 50, 50);

function safeGround() {
  //Safe grounds between the starting and end ground
  push();
  fill(100);
  rect(0, 170, width, 360);
}

function startingGround() {
  //starting ground
  push();

  fill(169, 169, 169);
  rect(0, height - 100, width, 80);
  pop();
}

function endingGround() {
  //goal
  push();

  fill(169, 169, 169);
  rect(0, 0, width, 100);
  pop();
}

function water() {
  push();
  fill(0, 0, 255);
  rect(0, 100, width, 100);
  pop();
}

function startscreen() {
  push();
  background(0);
  fill(255);
  textSize(30);
  text("Skipper Game", 300, 150);
  pop();
}
function gameWin() {
  push();
  background(0);
  fill(255);
  textSize(30);
  text("You Succeeded!", 300, 150);
  pop();
}

function gameLose() {
  push();
  background(0);
  fill(255);
  textSize(30);
  text("You Have Lost", 300, 150);
  pop();
}

class Button {
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }

  isPressed(x, y) {
    if (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    ) {
      return true;
    }

    return false;
  }

  draw() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255);
    rect(0, 0, this.width, this.height, this.height);

    //define text
    fill(255, 0, 0);
    textSize(this.height / 2);
    textAlign(CENTER, CENTER);
    text(this.text, this.width - 100, this.height / 2);
    pop();
  }
}

const startButton = new Button(300, 200, 200, 50, "Press to start");
const restartButton = new Button(300, 200, 200, 50, "Restart Game");

class Obstacle {
  constructor(x, y, width, height, r, g, b, speed, addSpeed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.r = r;
    this.g = g;
    this.b = b;
    this.speed = speed;
    this.addSpeed = addSpeed;
  }

  update() {
    //moved the obstacle in x-position
    if (this.x <= 800) {
      this.x = this.x + (this.speed + this.addSpeed);
    } else if (this.x > 800) {
      this.x = 0 - 100;
    }

    //checks if character is colliding with obstacle
    if (
      character1.x < this.x + this.width &&
      character1.x + character1.width > this.x &&
      character1.y < this.y + this.height &&
      character1.y + character1.height > this.y
    ) {
      // checks when gamelife reached zero you lose. Character starting point whenever you dies
      if (gameLives === 0) {
        gameState = "gameOver";
      } else {
        gameLives -= 1;
        character1.x = startX;
        character1.y = startY;
      }
    }
  }

  draw() {
    push();
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}

const obstacle1 = new Obstacle(50, 400, 100, 100, 0, 250, 250, 8, 1);
const obstacle2 = new Obstacle(50, 200, 100, 100,  255, 0, 0, 5, 1);
const obstacle3 = new Obstacle(480, 200, 100, 100, 255, 0, 0, 5, 1);
const obstacle4 = new Obstacle(480, 400, 100, 100, 250, 250, 0, 8, 1);

//obstacles array
let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4];

class Log extends Obstacle {
  constructor(x, y, width, height, speed, addSpeed) {
    super(x, y, width, height, 139, 69, 19, speed, addSpeed);
  }
  update() {

    if (this.x >= -100) {
      this.x = this.x - (this.speed + this.addSpeed);
    } else if (this.x < -100) {
      this.x = 800;
    }
    }
  }

const log1 = new Log(50, 100, 150, 100, 4, 1);
const log2 = new Log(600, 100, 150, 100, 4, 1);

//logs array
const logs = [log1, log2];

//character restart point when return button is pressed.
function mousePressed() {
  if (startButton.isPressed(mouseX, mouseY)) {
    gameState = "playing";
    character1.x = startX;
    character1.y = startY;
    gameLives = startLives;
  }
  
  if (restartButton.isPressed(mouseX, mouseY)) {
    gameState = "playing";
    character1.x = startX;
    character1.y = startY;
    gameLives = startLives;
  }
}

//The following 7 lines is adapted from https://chatgpt.com/share/67a14f4c-3f04-8008-a84e-5b77d81cf43f
function drawLives() {
  push();
  fill(0);
  textSize(25);
  text("Lives: " + (gameLives + 1), 30, 30);
  pop();
}

function drawScore() {
  push();
  fill(0);
  textSize(25);
  text("Scores: " + score, 11, 60);
  pop();
}

function draw() {
  background(169, 169, 169);
  safeGround();
  startingGround();
  endingGround();
  water();

  if (gameState === "start") {
    startscreen();
    startButton.draw();
  } else if (gameState === "playing") {

    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].update();
      obstacles[i].draw();
    }

    for (let i = 0; i < logs.length; i++) {
      logs[i].update();
      logs[i].draw();
    }
    character1.draw();
    character1.update();
     drawLives();
     drawScore();

  } else if (gameState === "gameSucceeded") {
    gameWin();
   restartButton.draw();
  } else if (gameState === "gameOver") {
    gameLose();
    restartButton.draw();
  }

}

