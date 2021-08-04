let radius = 70;
let n = 0
let circWidth = 10
let px = 0
let py= 0

function setup() {
	createCanvas(900, 900);
	angleMode(DEGREES);
	stroke(255);
	rectMode(CENTER)
	strokeWeight(4);
	background(0)
}

function draw() {
	//DO THE RECT FILL / FADE
	resetMatrix()
	blendMode(BLEND)
	//translate( -width/2, -height/2)
	fill(0,0,0, 50)
	noStroke()
	rect(-width/2-10, -height/2-10, width+10, height+10)
	
	
	translate( width/2, height/2)
	push()
	for (let j = 0; j < 1; j++) {
		for (let i = 0; i < 360; i++) {
		  
			let r = radius * 3.87 //<- magic number that keeps it on the screen
			let fluctX = (r  * cos(frameCount * 0.6)) * sin(r * sin(i) * cos(frameCount * 0.5));
			let fluctY = (r  * cos(frameCount * 0.5)) * sin(r * cos(i) * sin(frameCount * 0.6));
			let fluctX2 = (r  * cos(frameCount * 0.6)) * sin(r * sin(i + 1) * cos(frameCount * 0.5));
			let fluctY2 = (r  * cos(frameCount * 0.5)) * sin(r * cos(i + 1) * sin(frameCount * 0.6));
			
			let x1 = radius * cos(i) + fluctX
			let y1 =radius * sin(i) + fluctY
			let x2 = radius * cos(i + 1) + fluctX2
			let y2 = radius * sin(i + 1) + fluctY2
			
			stroke(100 * sin(i * 10), 145 - i/3, 100+i/2, 1)
			strokeWeight(12 * sin(i * 10));
			line(x1,y1,x2,y2);
			
			if (i == n){
				//blendMode(MULTIPLY)
				noStroke()
				fill("red")
				stroke("red")
				strokeWeight(8 + 4 * sin(i * 21));

				if (x1 > width/2 -circWidth) x1= width/2
				if (x1< -width/2 + circWidth ) x1 =  -width/2
				if (y1 > height/2 - circWidth) y1= height/2
				if (y1<  -height/2 + circWidth ) y1 = -height/2
				//ellipse( x1, y1, circWidth, circWidth)
				line( px, py, x1, y1)
				px = x1
				py = y1
				//Do the rect
				//noFill()
				//strokeWeight(1)
				//rect( x1, y1, x1, y1)
				//print( `${fluctX}, ${fluctY}`)
				let s = x1 + y1
				//console.log(`${s}`)
			}
		}
		pop()
		}

	n++
	if (n>356) n= 0
}