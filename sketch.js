window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

document.addEventListener('contextmenu', event => event.preventDefault());

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
	background(20, 133, 131);
	networkViewer.draw();
}