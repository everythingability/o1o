color myRed = #FC0061;
color myBlue = #0073FC;
color myPink = #FF36DB;
color myPurple = #8F00D8;
color myDarkPurple  = #430483 ;
//color[] colors = {myDarkPurple, myRed, myPink, myRed, myDarkPurple};
//color[] colors = {  myRed, myBlue};
color[] colors = {  myRed, myPink};

color lerpColors(float amt, color... colors) {
  if(colors.length==1){ return colors[0]; }
  float cunit = 1.0/(colors.length-1);
  return lerpColor(colors[floor(amt / cunit)], colors[ceil(amt / cunit)], amt%cunit/cunit);
}

void drawBG(){
  for(int i=0; i< height-1; i++){
    float n = map(i, 0, height, 0, 1);
    color c = lerpColors(n, colors);
    stroke(c);
    line(0,i,width,i);
    
  }
  
}
//ArrayList<LImage> imgsb ;
color overallColor;
float distance = 0;
int imgCount = 0;
boolean drawColors = false;

void calculateImage() {
  
  pushMatrix();
  stroke(#A3AD3A);
  strokeWeight(1);
  rectMode(CORNER);
  color averageColor = lerpColors(0.5, colors);//color(126.0 ,58.0, 175.0);  
  
  PVector avgVector =new PVector(red(averageColor),green(averageColor) , blue(averageColor));
  
  float r = 0;
  float g = 0;
  float b = 0;
  float numOfPixels = width * height;
  for (int x=0; x<width; x++) {
    for (int y=0; y<height; y++) {
      color c = get(x, y);
      r += red(c);//(c>>16)&0xff;
      g += green(c);//(c>>8)&0xff;
      b += blue(c);//c&0xff; 
    }
  }
   float avgR = (r/numOfPixels);
   float avgG = (g/numOfPixels);
   float avgB = (b/numOfPixels);
   //println( avgR,avgG , avgB);
   
   overallColor = color(avgR,avgG , avgB);
   PVector colorVector = new PVector(avgR,avgG , avgB);
   distance =dist(avgVector.x, avgVector.y, avgVector.z, colorVector.x, colorVector.y, colorVector.z);
   
   if (drawColors){
   fill(averageColor);
   rect(5, 5, 45, 45);
   
   fill(overallColor);  
   rect(15,15, 25, 25);
   }
   
  imgCount ++;
    
   if ( imgCount > 10){
     messedUp = true;//10 brushstrokes have happened
   }
   if (messedUp == true){
     println(distance);
     if (distance < 1){//has it found its way back to average?
        String n = "two_points_" + nf(imgCount, 4) + ".jpg";
        save(n);
        beep();
        filter(BLUR, 2);
        println("saved");
     }
   }
   popMatrix();
}
