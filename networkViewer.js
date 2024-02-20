class NetworkViewer {
	constructor(networkData, x, y, w, h) {
		this.networkData = networkData;
		this.minX = x || 0;
		this.width = w || width;
		this.minY = y || 0;
		this.height = h || height;
	}

	resize(x, y, w, h) {
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

		let nodeRenderedPosition = this.normalizedToRenderedPosition(node.position);
		let neighborRenderedPosition = this.normalizedToRenderedPosition(neighbor.position);

		push();
		stroke(240);
		strokeWeight(3);
		line(nodeRenderedPosition.x, nodeRenderedPosition.y, neighborRenderedPosition.x, neighborRenderedPosition.y);
		pop();
	}

	drawWrappedEdge(node, neighbor) {
		// determine left and right node
		let leftNode = node;
		let rightNode = neighbor;
		if (node.position.x > neighbor.position.x) {
			[leftNode, rightNode] = [rightNode, leftNode];
		}

		// get left edge position
		let leftPosition = leftNode.position;
		let leftPhantomPosition = {x: rightNode.position.x - 1, y: rightNode.position.y};
		let leftEdgeY = map(0, leftPhantomPosition.x, leftPosition.x, leftPhantomPosition.y, leftPosition.y);
		let leftEdgePosition = {x: 0, y: leftEdgeY};
		let leftRenderedPosition = this.normalizedToRenderedPosition(leftPosition);
		let leftEdgeRenderedPosition = this.normalizedToRenderedPosition(leftEdgePosition);

		// get right edge position
		let rightPosition = rightNode.position;
		let rightPhantomPosition = {x: leftNode.position.x + 1, y: leftNode.position.y};
		let rightEdgeY = map(1, rightPhantomPosition.x, rightPosition.x, rightPhantomPosition.y, rightPosition.y);
		let rightEdgePosition = {x: 1, y: rightEdgeY};
		let rightRenderedPosition = this.normalizedToRenderedPosition(rightPosition);
		let rightEdgeRenderedPosition = this.normalizedToRenderedPosition(rightEdgePosition);

		// draw edges
		push();
		stroke(240);
		strokeWeight(3);
		line(leftRenderedPosition.x, leftRenderedPosition.y, leftEdgeRenderedPosition.x, leftEdgeRenderedPosition.y);
		line(rightRenderedPosition.x, rightRenderedPosition.y, rightEdgeRenderedPosition.x, rightEdgeRenderedPosition.y);
		pop();

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
		let renderedPosition = this.normalizedToRenderedPosition(node.position);
		ellipse(renderedPosition.x, renderedPosition.y, 50);
		textSize(14);
		fill(0);
		if (node.color == "black" || node.color == "purple") fill(255);
		textAlign(CENTER, CENTER);
		text(node.name, renderedPosition.x, renderedPosition.y);
		pop();
	}

	normalizedToRenderedPosition(position) {
		let _position = {};
		_position.x = this.minX + position.x * this.width;
		_position.y = this.minY + position.y * this.height;
		return _position;
	}
}