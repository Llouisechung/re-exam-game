let x = 400;
let y = 570;
let gameState = "playing";
let gameLives = 3;

function setup() {
  createCanvas(800, 600);
  background(100);
  noStroke();
}
function character(x, y) {
  push();
  fill(250);
  square(x, y, 50);
  pop();
}
function safeGround() {
  //Safe grounds between the starting and end ground
  push();
  fill(100);
  rect(0, 170, width, 360);
  push();
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
  text("You Succeeded! ", 300, 150);
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
function gamePlay() {
  character(x, y);

  if (keyIsPressed) {
    if (keyCode === UP_ARROW) {
      y -= 5;
    }
    if (keyCode === DOWN_ARROW) {
      y += 5;
    }
    if (keyCode === LEFT_ARROW) {
      x -= 5;
    }
    if (keyCode === RIGHT_ARROW) {
      x += 5;
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
    translate(this.x + 120, this.y);
    noStroke();
    fill(255);
    rect(0, 0, this.width + 60, this.height, this.height / 4);

    //define text
    fill(255, 0, 0);
    textSize(this.height / 2);
    textAlign(CENTER, CENTER);
    text(this.text, this.width - 20, this.height / 2);
    pop();
  }
}

const startButton = new Button(200, 200, 100, 50, "Press to start");
const homescreen = new Button(200, 200, 100, 50, "Homescreen");
const restartButton = new Button(200, 200, 100, 50, "Restart Game");

class obstacle {
  constructor(x, y, r, g, b, speed, addSpeed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.speed = speed;
    this.addSpeed = addSpeed;
  }

  update() {
    if (this.x <= 800) {
      this.x = this.x + (this.speed + this.addSpeed);
    } else if (this.x > 800) {
      this.x = 0 - 100;
    }

    // these following 7 lines are adapted from ChatGPT: https://chatgpt.com/share/67a0d336-b2bc-8005-bc3c-e1986e51bbc7
    if (
      x < this.x + 100 &&
      x + 50 > this.x &&
      y < this.y + 100 &&
      y + 50 > this.y
    ) {
      gameState = "gameOver";
      gameState = gameLives - 1;
    }
  }

  draw() {
    push();
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, 100, 100);
    pop();
  }
}

const obstacle1 = new obstacle(50, 400, 0, 250, 250, 8, 0);
const obstacle2 = new obstacle(50, 200, 255, 0, 0, 4, 0);
const obstacle3 = new obstacle(480, 200, 255, 0, 0, 4, 0);
const obstacle4 = new obstacle(480, 400, 250, 250, 0, 8, 0);
let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4];

//function level1() {
//design for level 1
//}

//function squareMethodsforward

//obsticle objects, färg(3) speed (3)

//obsticle arrays
//let squareForward = []
//let squareBackwards

function draw() {
  background(169, 169, 169);
  safeGround();
  startingGround();
  endingGround();
  water();
  character(x, y);

  if (gameState === "start") {
    startscreen();
    startButton.draw();
  } else if (gameState === "playing") {
    gamePlay();
  } else if (gameState === "gameSucceeded") {
    gameWin();
    homescreen.draw();
  } else if (gameState === "gameOver") {
    gameLose();
    restartButton.draw();
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].update();
    obstacles[i].draw();
  }

  //loops the obstacle
}
