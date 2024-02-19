class NetworkViewer {
	constructor(networkData) {
		this.networkData = networkData;
	}

	draw() {
		// draw edges
		let drawnEdges = new Set();
		for (let nodeId in this.networkData) {
			let node = this.networkData[nodeId];
			for (let neighborId of node.connections) {
				if (!drawnEdges.has(nodeId+"-"+neighborId) && !drawnEdges.has(neighborId+"-"+nodeId)) {
					if (this.drawEdge(node, this.networkData[neighborId])) {
						drawnEdges.add(nodeId+"-"+neighborId);
					}
				}
			}
		}

		// draw nodes
		for (let node of Object.values(this.networkData)) {
			this.drawNode(node);
		}
	}

	drawEdge(node, neighbor) {
		let nodeX = node.position.x;
		let nodeY = node.position.y;
		let neighborX = neighbor.position.x;
		let neighborY = neighbor.position.y;
		
		let edgeIsDrawn = true;

		push();
		stroke(240);
		strokeWeight(3);

		if (node.horizontalWrapNeighborsRight.includes(neighbor.name)) {
			neighborX += 1;
			edgeIsDrawn = false;
		}
		if (node.horizontalWrapNeighborsLeft.includes(neighbor.name)) {
			neighborX -= 1;
			edgeIsDrawn = false;
		}

		line(width*nodeX, height*nodeY, width*neighborX, height*neighborY);
		pop();

		return edgeIsDrawn;
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