window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

let data;

async function getData() {
	let response = await fetch('./assets/mapNetworkData.json');
	return await response.json();
}

async function setup() {
	data = await getData();
	console.log(data);
	createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	background(255, 0, 90);
	stroke(0, 0, 255);
	fill(100, 0, 255);
	ellipse(mouseX, mouseY, 90);
}