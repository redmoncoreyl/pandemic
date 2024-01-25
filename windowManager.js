class WindowManager {
	constructor() {
		this.minimumPadding = 4;
		this.canvasAspectRatio = 1.9;
	}
	
	getCanvasWidth() {
		let canvasMaximumWidth = window.innerWidth - 2*this.minimumPadding;
		let canvasMaximumHeight = window.innerHeight - 2*this.minimumPadding;

		if (canvasMaximumWidth/canvasMaximumHeight <= this.canvasAspectRatio) {
			return canvasMaximumWidth;
		}
		return canvasMaximumHeight*this.canvasAspectRatio;
	}

	getCanvasHeight() {
		let canvasMaximumWidth = window.innerWidth - 2*this.minimumPadding;
		let canvasMaximumHeight = window.innerHeight - 2*this.minimumPadding;

		if (canvasMaximumWidth/canvasMaximumHeight >= this.canvasAspectRatio) {
			return canvasMaximumHeight;
		}
		return canvasMaximumWidth/this.canvasAspectRatio;
	}

	setCanvasPadding() {
		let canvasWidth = this.getCanvasWidth();
		let canvasHeight = this.getCanvasHeight();
		let canvasPaddingLeft = (window.innerWidth - canvasWidth)/2;
		let canvasPaddingTop = (window.innerHeight - canvasHeight)/2;

		document.getElementsByTagName('canvas')[0].style.marginLeft = canvasPaddingLeft + 'px';
		document.getElementsByTagName('canvas')[0].style.marginTop = canvasPaddingTop + 'px';
	}
}