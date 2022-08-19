/**
 * Created by uFlock on 12/12/2020.
 */

"use strict";

import Input from './systems/input';

export default class Engine {

	constructor(canvasElement, width, height) {

		this.currentLoop = params => {};
		this.gameState = {};

		this.width = width;
		this.height = height;

		this.canvasElement = canvasElement;
		this.canvasElement.width = width;
		this.canvasElement.height = height;

		this.input = new Input();
		this.input.setCanvasElement(canvasElement);

		this.lastFrameTime = 0;
		this.elapsedTime = 0;

		this.c = this.canvasElement.getContext('2d');
	}

	setupInput(supportedKeys) {
		this.input.setKeysToSupport(supportedKeys);
	}
	setCurrentLoop(loop) {
		this.currentLoop = loop;
	}
	run() {

		this.input.connectInput();

		requestAnimationFrame(this._mainLoop.bind(this));
	}
	_mainLoop(timestamp) {

		this.elapsedTime = timestamp - this.lastFrameTime;
		this.lastFrameTime = timestamp;

		this.input.processInput();

		this.currentLoop(this.elapsedTime/1000, this.c, this.input, this)

		requestAnimationFrame(this._mainLoop.bind(this));
	}
}
