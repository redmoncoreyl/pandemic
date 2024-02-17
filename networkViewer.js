class NetworkViewer {
	constructor(networkData) {
		this.networkData = networkData;
		this.activeNodeId = undefined;
	}

	draw() {
		// move activeNode
		if (this.activeNodeId) {
			let activeNode = this.networkData[this.activeNodeId]
			activeNode.position.x = mouseX/width;
			activeNode.position.y = mouseY/height;
		}

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

	mousePressed(mouseButton) {
		if (mouseButton == CENTER) {
			this.normalizeNodeLocations();
			return;
		}
		if (mouseButton == RIGHT) {
			console.log(this.networkData);
			return;
		}

		if (this.activeNodeId) {
			this.activeNodeId = undefined;
			return;
		}

		for (let nodeId in this.networkData) {
			let node = this.networkData[nodeId];
			let nodeX = node.position.x*width;
			let nodeY = node.position.y*height;
			let distance = dist(nodeX, nodeY, mouseX, mouseY);
			if (distance < 25) {
				this.activeNodeId = nodeId;
				return;
			}
		}
	}

	normalizeNodeLocations() {
		let minX = 1;
		let maxX = 0;
		let minY = 1;
		let maxY = 0;
		for (let nodeId in this.networkData) {
			let node = this.networkData[nodeId];
			let nodeX = node.position.x;
			let nodeY = node.position.y;
			if (nodeX < minX) minX = nodeX;
			if (nodeX > maxX) maxX = nodeX;
			if (nodeY < minY) minY = nodeY;
			if (nodeY > maxY) maxY = nodeY;
		}
		
		for (let nodeId in this.networkData) {
			let node =  this.networkData[nodeId];
			let nodeX = node.position.x;
			let nodeY = node.position.y;
			node.position.x = map(nodeX, minX, maxX, 0.1, 0.9);
			node.position.y = map(nodeY, minY, maxY, 0.05, 0.95);
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