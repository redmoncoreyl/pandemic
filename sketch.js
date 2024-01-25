window.onresize = () => {
	windowManager = new WindowManager();
	resizeCanvas(windowManager.getCanvasWidth(), windowManager.getCanvasHeight());
	windowManager.setCanvasPadding();
}

function setup() {
	let windowManager = new WindowManager();
	createCanvas(windowManager.getCanvasWidth(), windowManager.getCanvasHeight());
	windowManager.setCanvasPadding();
}

function draw() {
	background(255, 0, 90);
	stroke(0, 0, 255);
	fill(100, 0, 255);
	ellipse(mouseX, mouseY, 90);
}