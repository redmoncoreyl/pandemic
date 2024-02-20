window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
	networkViewer.resize(10, 10, width*0.8, height*0.9);
}

document.addEventListener('contextmenu', event => event.preventDefault());

let networkData;
let networkViewer;

function preload() {
	networkData = loadJSON('assets/mapNetworkData.json');
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	networkViewer = new NetworkViewer(networkData, 10, 10, width*0.8, height*0.9);
}

function draw() {
	background(20, 133, 131);
	networkViewer.draw();
}