class NetworkViewer {
	constructor(networkData, x, y, w, h) {
		this.networkData = networkData;
		this.minX = x || 0;
		this.width = w || width;
		this.minY = y || 0;
		this.height = h || height;
	}

	draw() {
		// draw edges
		let visitedNodeIds = new Set();
		for (let nodeId in this.networkData) {
			let node = this.networkData[nodeId];
			for (let neighborId of node.connections) {
				if (visitedNodeIds.has(neighborId)) continue;
				this.drawEdge(node, this.networkData[neighborId]);
			}
			visitedNodeIds.add(nodeId);
		}

		// draw nodes
		for (let node of Object.values(this.networkData)) {
			this.drawNode(node);
		}

		// draw border
		this.drawBorder();
	}

	drawEdge(node, neighbor) {
		if (node.horizontalWrapNeighborsLeft.includes(neighbor.name) ||
				node.horizontalWrapNeighborsRight.includes(neighbor.name)) {
			this.drawWrappedEdge(node, neighbor);
			return;
		}

		let nodeX = node.position.x;
		let nodeY = node.position.y;
		let neighborX = neighbor.position.x;
		let neighborY = neighbor.position.y;
		
		let edgeIsDrawn = true;

		push();
		stroke(240);
		strokeWeight(3);
		line(width*nodeX, height*nodeY, width*neighborX, height*neighborY);
		pop();
	}

	drawWrappedEdge(node, neighbor) {

	}

	drawBorder() {
		push();
		noFill();
		strokeWeight(5);
		stroke(255);
		rect(this.minX, this.minY, this.width, this.height);
		pop();
	}

	drawNode(node) {
		push();
		noStroke();
		fill(node.color);
		ellipse(width*node.position.x, height*node.position.y, 50);
		textSize(14);
		fill(0);
		if (node.color == "black" || node.color == "purple") fill(255);
		textAlign(CENTER, CENTER);
		text(node.name, width*node.position.x, height*node.position.y);
		pop();
	}
}