let startX = 400;
let startY = 570;
let gameState = "playing";
let startLives = 2;
let gameLives = startLives;

function setup() {
  createCanvas(800, 600);
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

  //
  update() {
    // The following
    //checking if character moves with the log otherwise character dies
    let onLog = false;

    if (this.y < 200 && this.y > 100) {
      for (let i = 0; i < logs.length; i++) {
        let logObject = logs[i];

        if (
          this.x + this.width > logObject.x &&
          this.x < logObject.x + logObject.width &&
          this.y + this.height >= logObject.y &&
          this.y + this.height <= logObject.y + logObject.height
        ) {
          //character moves with the log if character is on it
          this.x += logObject.speed;
          onLog = true;
          break;
        }
      }

      //character dies if fallen into water
      if (!onLog) {
        if (gameLives === 0) {
          gameState = "gameOver";
        } else {
          gameLives -= 1;
          this.x = startX;
          this.y = startY;
        }
      }
    }
    //player wins in reached goal
    if (this.y < 40) {
      gameState = "gameSucceeded";
    }
  }
}

const character1 = new character(startX, startY, 50, 50);

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
const homescreen = new Button(300, 200, 200, 50, "Homescreen");
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
    rect(this.x, this.y, 100, 100);
    pop();
  }
}

const obstacle1 = new Obstacle(50, 400, 150, 50, 0, 250, 250, 8, 0);
const obstacle2 = new Obstacle(50, 200, 150, 50, 255, 0, 0, 10, 0);
const obstacle3 = new Obstacle(480, 200, 150, 50, 255, 0, 0, 10, 0);
const obstacle4 = new Obstacle(480, 400, 150, 50, 250, 250, 0, 8, 0);

//obstacles array
let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4];

class Log extends Obstacle {
  constructor(x, y, width, height, speed, addSpeed) {
    super(x, y, width, height, 139, 69, 19, speed, addSpeed);
  }
  update() {
    if (this.x <= 800) {
      this.x = this.x + (this.speed + this.addSpeed);
    } else if (this.x > 800) {
      this.x = 0 - 100;
    }

    if (
      character1.x + character1.width > this.x &&
      character1.x < this.x + this.width &&
      character1.y + character1.height >= this.y &&
      character1.y + character1.height <= this.y + 50
    ) {
      character1.x += this.speed;
    }
  }
}

const log1 = new Log(50, 100, 150, 50, 4, 0);
const log2 = new Log(600, 100, 150, 50, 4, 0);

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
  } else if (gameState === "gameSucceeded") {
    gameWin();
    homescreen.draw();
  } else if (gameState === "gameOver") {
    gameLose();
    restartButton.draw();
  }
}
