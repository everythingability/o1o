/*Inspired by @takawo: 
https://openprocessing.org/user/6533?view=sketches

*/
let images = []
let hasClicked = false
let font
let basket

function preload() {

  let imgs = ["0_Faulty-online-products.jpg",
    "9bbbf61420a9bae685f70b8a20240aaa.jpg",
    "120106244-boxes-with-amazon-logo-on-pallet-editorial-3d-rendering.jpg",
    "amazon_cardboardEnvelope_v2.png",
    "amazon-logo-cardboard-box-london-uk-circa-january-brown-corrugated-adhesive-tape-129229350.jpg",
    "amazonbox.jpg",
    "Gear-Prime-1067784388.jpg",
    "ap_19050781367369-e1595606793360.jpg",
    "aus-amazon-box.jpg",
    "getty_1214038128_2000133320009280391_zged5k.jpg",
    "IMG_2308-e1564227216165.jpeg",
  ]

  for (i = 0; i < imgs.length; i++) {
    let img = "images/" + imgs[i]
    images.push(loadImage(img))
  }

  mySound = loadSound('Rocketman.mp3');
  font = loadFont("Helvetica Neu Bold.ttf")
  basket = loadImage("basket.png")
}



function setup() {
  let canvas = createCanvas(innerWidth, innerHeight, WEBGL);
  canvas.mousePressed(canvasPressed);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  textFont(font)
  textSize(50)
  textAlign(CENTER, CENTER)

  ortho(-width / 2, width / 2, -height / 2, height / 2, -3000, 3000);
  //perspective(PI / 3.0, width / height, 0.1, 100);

  setAttributes('antialias', true);
  ////frustum(-0.1, 0.1, -0.1, 0.1, 0.1, 1000);
}


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  value = "1"
  fill("#FF9900")
  text(value, -186, -30)
  setTimeout(function(){
    value = "1"
    print("sold!")
    hasClicked = true
    mySound.loop();
  }, 1000);

  
  
  
}


let c = 0
let value ="0"
function draw() {
  background(0);

  if (hasClicked == true){
    c ++
    if (c>80)c =80
    //c = map(mouseY, 0, height, 0, 200)
    //print(frameRate())
    randomSeed(frameCount / (360 * 360));
    //orbitControl();
    ambientLight(0, 0, c/5);
    directionalLight(color(0, 0, c), -1, 0, -1);
    let offset = width / 15;

    let x = 0;
    let y = 0;
    let z = 0;

    let d = width * 2.75;
    let minD = width / 3;

    noStroke();
    push();
      rotateX(-15 * sin(frameCount / 3) - 30);
      rotateY(45 + frameCount / 7);
      translate(-d / 2, 0, -d / 2);
      separateGrid(x, y, z, d, minD);
    pop();


  }else{
    image(basket, -250, -40)
  
    fill("#ffffff")
    text("Click to buy", 0, 0)
    fill("#FF9900")
    text(value, -186, -30)

  }
}

function separateGrid(x, y, z, d, minD) {
  let sep = int(random(2, 5));
  let w = d / sep;
  for (let j = 0; j < sep; j++) {
    for (let i = 0; i < sep; i++) {
      let nx = x + i * w;
      let nz = z + j * w;
      if (random(100) < 95 && w > minD) {
        separateGrid(nx, 0, nz, w, minD);
      } else {
        let h = random(minD / 5, d);
        let ny = -h / 2;
        push();

        //ambientMaterial(250);
        translate(nx + w / 2, ny, nz + w / 2);
        //fill(random(palette));
        // if(random(100) > 50){
        // rotateX(180);
        //   cone(w * 0.4,h,int(random(5,10)));
        // }else{
        let img = images[int(random(0, images.length - 1))]
        texture(img)
        box(w * 0.9, h, w * 0.9);
        // }
        pop();
      }
    }
  }
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
