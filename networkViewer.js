class NetworkViewer {
	constructor(networkData) {
		this.networkData = networkData;
		this.activeNodeId = undefined;
	}

	draw() {
		// move activeNode
		if (this.activeNodeId) {
			let activeNode = this.networkData[this.activeNodeId]
			activeNode.location.x = mouseX/width;
			activeNode.location.y = mouseY/height;
		}

		// draw edges
		let edgeSet = new Set();
		for (let nodeId in this.networkData) {
			let node = this.networkData[nodeId];
			for (let neighborId of node.connections) {
				if (!edgeSet.has(nodeId+"-"+neighborId) && !edgeSet.has(nodeId+"-"+neighborId)) {
					this.drawEdge(node, this.networkData[neighborId]);
					edgeSet.add(nodeId+"-"+neighborId);
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
		}
		if (mouseButton == RIGHT) {
			console.log(this.networkData);
		}

		if (this.activeNodeId) {
			this.activeNodeId = undefined;
			return;
		}

		for (let nodeId in this.networkData) {
			let node = this.networkData[nodeId];
			let nodeX = node.location.x*width;
			let nodeY = node.location.y*height;
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
			let nodeX = node.location.x;
			let nodeY = node.location.y;
			if (nodeX < minX) minX = nodeX;
			if (nodeX > maxX) maxX = nodeX;
			if (nodeY < minY) minY = nodeY;
			if (nodeY > maxY) maxY = nodeY;
		}
		
		for (let nodeId in this.networkData) {
			let node =  this.networkData[nodeId];
			let nodeX = node.location.x;
			let nodeY = node.location.y;
			node.location.x = map(nodeX, minX, maxX, 0.1, 0.9);
			node.location.y = map(nodeY, minY, maxY, 0.05, 0.95);
		}
	}

	drawEdge(node, neighbor) {
		push();
		stroke(40);
		strokeWeight(2);
		line(width*node.location.x, height*node.location.y, width*neighbor.location.x, height*neighbor.location.y);
		pop();
	}

	drawNode(node) {
		push();
		noStroke();
		fill(node.color);
		ellipse(width*node.location.x, height*node.location.y, 50);
		textSize(14);
		fill(0);
		if (node.color == "black") fill(255);
		textAlign(CENTER, CENTER);
		text(node.name, width*node.location.x, height*node.location.y);
		pop();
	}
}