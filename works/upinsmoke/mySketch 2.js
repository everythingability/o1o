let nums
let images = []

function preload() {

	let imgs = ["0_Faulty-online-products.jpg",
		"9bbbf61420a9bae685f70b8a20240aaa.jpg",
		"120106244-boxes-with-amazon-logo-on-pallet-editorial-3d-rendering.jpg",
		"amazon_cardboardEnvelope_v2.png",
		"amazon-logo-cardboard-box-london-uk-circa-january-brown-corrugated-adhesive-tape-129229350.jpg",
		"amazonbox.jpg",
		"ap_19050781367369-e1595606793360.jpg",
		"aus-amazon-box.jpg",
		"getty_1214038128_2000133320009280391_zged5k.jpg",
		"IMG_2308-e1564227216165.jpeg",
	]

	print(imgs)

	for (i = 0; i < imgs.length; i++) {
		let img = "images/" + imgs[i]
		images.push(loadImage(img))
	}

	const gui = new dat.gui.GUI()
	nums = new Nums
	gui.add(nums, 'speed', .01, .05)
	gui.add(nums, 'scale', 12, 30)
	gui.add(nums, 'texture_depth', 0, 30)
}



class Nums {
	constructor() {
		this.speed = .3
		this.scale = 29
		this.texture_depth = 29
	}
}

setup = _ => {
	createCanvas(innerWidth, innerHeight, WEBGL)
	//perspective(PI / 3.0, width / height, 0.1, 500);
	setAttributes('antialias', true);
    frustum(-0.1, 0.1, -0.1, 0.1, 0.1, 800);
	noStroke()
	
	T = []

	pg = createGraphics(s = 64, s)
	for (i = 0; i <= 30; i++) {
		T[i] = createGraphics(s, s)
		img = images[int(random(0, images.length-1))]
		T[i].image(img, 0, 0, s, s)
	}//*/
}

t = 0

draw = _ => {
	
	
    //texture(img)

	rotateX(.05)
	background(0)
	scale(nums.scale)
	t += nums.speed
    n = 0
	for (i = 500; i--;) {
		const { x, y } = p5.Vector.fromAngle(i % PI, 4)
		push()
			translate(x, y, (i + t) %50)
			texture(T[int(n)])
			box(cos(s = i ** 9 % 9) * 2, sin(s) * 2, s)
		pop()
		n++
		n = n %10
	}
}