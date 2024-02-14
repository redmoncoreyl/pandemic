window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	background(255, 0, 90);
	stroke(0, 0, 255);
	fill(100, 0, 255);
	ellipse(mouseX, mouseY, 90);
}