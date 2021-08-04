let seed;
let size = 3000;
let fineness = 20;
let img;

function preload() {
  img = loadImage('rabbit.jpg');//2772 x 3000
}

function setup() {
  noCursor();
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);
  noStroke();
  seed = random(1, 20);
}

function draw() {
  randomSeed(seed);
  for (let i = 0; i < size; i += fineness) {
    push();
    translate(width / 2, height / 2);
    drawArc(size - i);
    pop();
  }
  
}

function drawArc(radius) {
  drawingContext.save();
  // stroke(255);
  rect(0, 0, radius);
  drawingContext.clip();
  
  image(
    img,
    0,
    0,
    img.width + radius * 4 * abs(sin(frameCount * 0.5)),
    img.height + radius * 4 * abs(sin(frameCount * 0.5))
  );
  drawingContext.restore();
}

