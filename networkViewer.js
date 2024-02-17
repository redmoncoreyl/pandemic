class NetworkViewer {
	constructor(networkData) {
		this.networkData = networkData.network;
		for (let node of Object.values(this.networkData)) {
			node.location.x = Math.random()*0.8 + 0.1;
			node.location.y = Math.random()*0.8 + 0.1;
		}
		this.activeNode = undefined;
	}

	draw() {
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
		if (mouseButton != LEFT) return;

		for (let nodeId in this.networkData) {
			let node = this.networkData[nodeId];
			let nodeX = node.location.x*width;
			let nodeY = node.location.x*width;
			let distance = dist(nodeX, nodeY, mouseX, mouseY);
			if (distance < 25) {
				this.activeNode = nodeId;
				return;
			}
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