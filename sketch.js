window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

let data;
let networkViewer;

async function getData() {
	let response = await fetch('./assets/mapNetworkData.json');
	return await response.json();
}

async function setup() {
	data = await getData();
	createCanvas(window.innerWidth, window.innerHeight);
	networkViewer = new NetworkViewer(data);
}

function draw() {
	background(34, 181, 152);
	networkViewer.draw();
}