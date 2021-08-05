float beginX = random(width/2);  // Initial x-coordinate
float beginY = random(width/2);  // Initial y-coordinate
float endX = random(width/2);   // Final x-coordinate
float endY = random(height/2);   // Final y-coordinate
float distX;          // X-axis distance to move
float distY;          // Y-axis distance to move
float exponent = 4;   // Determines the curve
float x = random(width/2);        // Current x-coordinate
float y = random(width/2);        // Current y-coordinate
float step = 0.1;    // Size of each step along the path
float pct = 0.0;      // Percentage traveled (0.0 to 1.0)
float z;
float pX;
float pY;
float angle = 0;
float ang1 = radians(angle);
float scalar = 255;

boolean messedUp = false;


void reset() {
  calculateImage();
  pct = 0.0;
  beginX = x;
  beginY = y;
  endX = random(z,width-z);
  endY = random(z,height-z);
  distX = endX - beginX;
  distY = endY - beginY;
  exponent = random(1, 7);
  step = random(0.01, 0.02);
  color color2 = color(get(int(endX), int(endY)));
  color color1 = color(get(int(beginX), int(beginY)));
  colors[0] = color1;
  colors[1] = color2 ;
}

void setup() {
  size(1000, 800);
  background(myBlue);
  drawBG();
  save("gradient.jpg");
  color c = lerpColors(0.5, colors);
  println(red(c), green(c), blue(c) );
  
  reset();
  pX = beginX;
  pY = beginY;
  distX = endX - beginX;
  distY = endY - beginY;
  
}

void draw() {
 
  ang1 = radians(angle);
  z = abs(scalar * cos(ang1));
  //rect(0, 0, width, height);
  pct += step;
  if (pct < 1.0) {
    //if( random(1)> 0.9){
      x = beginX + (pct * distX);
      y = beginY + (pow(pct, exponent) * distY);
    //}else{
      //y = beginY + (pct * distX);
     // x = beginX + (pow(pct, exponent) * distY);
    //}
  }else{
    reset();
  }
  fill(#D2FF0D);
 // stroke(255-z, abs(z), pct*250 -z);
  //println(pct);
  color c = lerpColors(pct, colors);
  stroke(c);
  strokeWeight(z/4);
  //ellipse(x, y, 20, 20);
  line(x, y, pX, pY);
  
  pX = x;
  pY = y;
  angle += 0.2;
}

void mousePressed(){
  save("two_points_" + random(100) + ".jpg");
  println("saved");
}
