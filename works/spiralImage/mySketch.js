let photo = [
	//"redblue-sheep.png"
	"dolls leg.jpg"
	//"Betty.jpg",

]
let x,y,angle;
let progress = 0;
let img;
let posAngle = 0;
let IMGRATIO = 1.5;

function preload(){
	img = loadImage(random(photo));
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);
	background(0);
	IMGRATIO = (img.width/img.height)
	console.log( "IMGRATIO: ", IMGRATIO)
	image(img, width/2, height/2, windowWidth, windowHeight)
}

function draw() {
	
	let px = x;
	let py = y;
	let pa = angle;
	let pPosa = posAngle;
	
	const noiseScale = 0.0005;
	const weight = .5;
	let nv = noise(frameCount*noiseScale * 0.8);
	let nv2 = noise(frameCount* noiseScale + 10/noiseScale);
	let len = min(width,height)*(0.3 + nv*0.3);
	posAngle +=  TAU/30;
	let posRadius = posAngle/TAU * len * 0.8;
	if(posRadius > max(width,height)/2 + len)noLoop();
	angle = posAngle + map(nv, 0, 1, -PI/5, PI/5) - PI/2;
	x = width/2 + cos(posAngle) * posRadius;
	y = height/2 + sin(posAngle) * posRadius;
	if(frameCount == 1){px = x; py = y; pa = angle}
	let d = dist(px,py, x,y);
	let da = angle - pa;
	d += len * abs(da);
	
	if(d < height){
		let num = ceil(d/weight);
		for(let i = 0; i < num; i++){
			const ratio = map(i, 0, num-1, 0, 1);
			push();
			translate(px + ratio * (x-px) , py + ratio * (y-py));
			rotate(pa + ratio * (angle - pa));
			image(img,0,0,weight*2,len, progress%(img.width-weight*2), 0,weight*2, img.height);
			pop();
			progress +=img.width/img.height / IMGRATIO;
		}
	}

}

function mousePressed(){
	saveCanvas("spiralImage.png")
}

