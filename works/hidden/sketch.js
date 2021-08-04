/*
So this approach feeds a sketch buffer to Hydra.
Tom Smith. https://everythingability.com
See also: https://editor.p5js.org/remarkability/sketches/Kym_1i4t5
*/

var hydra = new Hydra({canvas: document.getElementById("hydraCanvas")})

let inc = 0.01
let z = inc
let font
let canvas
let cardWidth = 800;
let cardHeight = 800;
let theTextSize = 140
let hydraBuffer;
let p5Buffer
let chars = `ABCDEFGHIJKLMNOPQRSTUVWXTZ`
let theText = "HIDDEN IN PLAIN SIGHT"
let chunkSize

function preload(){
  font = loadFont("Inconsolata-Bold.ttf")
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}



let doctoredText = ""
function prepareText(){ 
  let randomizedText = "@"
  let theIndex = 0
  for(let y=0; y< height; y += chunkSize){//make a string of randoms
      for(let x=0; x< width; x+=chunkSize){       
          let theLetter = chars[int(random(0, chars.length-1))]
          randomizedText += theLetter
          theIndex++
      }
  }
  //randomizedText = randomizedText.slice( 0, theIndex )//chop to fit grid.
  let rLen = int(randomizedText.length/2)
  let tLen = int(theText.length)
  let off1 = rLen - tLen
  let off2 = rLen 


  //print(randomizedText.length, theText.length, off1, off2, off2-off1)
  //Do the doctoring
  let t1 = randomizedText.slice(0, off1)
  let t2 = theText
  let t3 = randomizedText.slice(off2, randomizedText.length-1)
  doctoredText = t1 + t2 + t3
}

function gridText(){
 
  let theIndex = 0
  for(let y=0; y< height; y += chunkSize){
      for(let x=0; x< width; x+=chunkSize){
          p5Buffer.push()
          let xOff = -width/2
          let yOff = -height/2
          p5Buffer.translate(xOff, yOff )
         
          let theLetter = doctoredText[theIndex]
         // print(theIndex, theLetter)
          p5Buffer.fill("#005dff")
          let r = int(random(0,2))
          if (r==0)theLetter = theLetter.toLowerCase()
          if (r==1)theLetter = theLetter.toUpperCase()
          //print( r, theLetter)
          p5Buffer.text(theLetter, x+12, y-3)
         p5Buffer.pop()

        theIndex ++
      }
  }

 //print( theIndex , theIndex/2)//480

}

function animateText(){

  let charNum = int(random(0, doctoredText.length-1))
  let r = int(random(0,2))
  let theChar = doctoredText.charAt(charNum)
  
  if(r==0){
    theChar = theChar.toUpperCase()
    //print(theChar)
    doctoredText = setCharAt(theText,charNum,theChar);
  }else{
    theChar = theChar.toLowerCase()
    //print(theChar)
    doctoredText = setCharAt(theText,charNum,theChar);
  }
  //print(theText)
}

function setup() {
  canvas = createCanvas(cardWidth, cardHeight, WEBGL);
  chunkSize = cardWidth/20

  textFont(font)
  textSize(theTextSize)
  textAlign(CENTER)
  hydraBuffer = createGraphics(cardWidth, cardHeight);
  hydraBuffer.textFont(font)
  
  p5Buffer = createGraphics(cardWidth, cardHeight, WEBGL);
  p5Buffer.textFont(font)
  p5Buffer.textSize(chunkSize)
  p5Buffer.textAlign(CENTER)
  p5Buffer.angleMode(DEGREES)
  p5Buffer.smooth()

  prepareText()

  s0.init({src: p5Buffer.canvas})//put the sketch into s0
  //noLoop()
}

function draw() {
  p5Buffer.background("red");
  prepareText()
  gridText()
  
  /*
  p5Buffer.push()
    //p5Buffer.fill("white")
    p5Buffer.translate(-width/2, -height/2, 0.001)
    p5Buffer.fill(255,0, 40); 
    p5Buffer.text(theText, 30, 200, width, height)
  p5Buffer.pop()*/
  


  //update the hydra onto the HydraBuffer
  hydraBuffer.push()
    hydraBuffer.image(select("#hydraCanvas"), 0, 0, hydraBuffer.width, hydraBuffer.height);
  hydraBuffer.pop()
  
  //Draw resultant HydraBuffer to screen
  translate(-width/2, -height/2)
  image(hydraBuffer, 0, 0)
  
  /*z += inc
  print(z)//for some reason once zoomed in, it don't zoom back.
  if (z > 3) {
    inc = -inc
  }else if (z <0){ 
    inc = +inc
  }*/
}

function mousePressed(){
  saveCanvas("hidden.png")
}

////////////////////////////// HYDRA /////////////////


//Load an image into the s1 var, OR use an image in p5
/*
imgEl = document.createElement('img');
imgEl.crossOrigin = 'anonymous';
imgEl.src = 'https://www-users.york.ac.uk/~tas509/cors/Boris_Johnson_AP.jpg'
s1.init({src: imgEl});
*/

src(s0)
.modulateScale(
  noise([1.2, 0.8].fast(0.004) )
)
.out()
/*noise(5,0.1,7)
.rotate(1,-1,-2).mask(shape(20))
.colorama(0.5)
.modulateScale(s0)
.modulateScale(s0,1,)
.out(o1)*/
/*
speed = 0.05
osc(2).add(noise(4, 5))
.diff(o0)
.colorama([1, 0.0, 0.66, .8   ])
//.blend(o1)
.blend(s0)
//.scrollX(0.5,0)


//
//.diff(o1)
.out()*/