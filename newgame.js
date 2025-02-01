let x = 400;
let y = 570;

function setup() {
  createCanvas(800, 600);
  background(10, 100, 200);
  noStroke();
}
function character(x, y) {
  push();
  fill(250);
  ellipse(x, y, 45);
  pop();
}
function safeGround() {
  //Safe grounds between the starting and end ground
  push();
  fill(100);
  rect(0, 340, width, 70);
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
  rect(0, height - 80, width, 100);
  pop();
}

function endingGround() {
  //goal
  push();

  fill(169, 169, 169);
  rect(0, 0, width, 70);
  pop();
}

//function startscreen () {
// Text("start", 400, 500);
//}
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
  safeGround();
  startingGround();
  endingGround();
  character(x, y);
}
