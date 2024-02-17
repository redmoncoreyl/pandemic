window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

let networkData;
let networkViewer;

function preload() {
	networkData = loadJSON('assets/mapNetworkData.json');
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	networkViewer = new NetworkViewer(networkData);
}

function draw() {
	background(34, 181, 152);
	networkViewer.draw();
}