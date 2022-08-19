"use strict";

export default class Input {

	constructor() {

		this.input = {};

		this.oldKeyState = {};
		this.newKeyState = {};

		this.newMouseStateClick = false;
		this.oldMouseStateClick = false;

		this.liveKeyStates = {
			pressed: {}
		};

		this.liveMouseState = {
			click: false,
			held: false
		}

		this.mouse = {
			x: 0,
			y: 0,
			clicked: false,
			held: false,
			released: false
		}
	}

	connectInput() {

		window.addEventListener('keyup', event => this._onKeyup(event.key.toUpperCase()));
		window.addEventListener('keydown', event => this._onKeydown(event.key.toUpperCase()));

		this.canvasElement.addEventListener('mousemove', event => this._onMouseMove(event));
		this.canvasElement.addEventListener('mousedown', event => this._onMouseDown(event));
		this.canvasElement.addEventListener('mouseup', event => this._onMouseUp(event));
	}
	setKeysToSupport(keysToSupport = ['']) {
		this.keysToSupport = keysToSupport;
		this._createKeys();
	}
	setCanvasElement(canvasElement) {
		this.canvasElement = canvasElement;
	}
	processInput() {

		this.newMouseStateClick = this.liveMouseState.click;

		this.mouse.clicked = false;
		this.mouse.released = false;

		if (this.newMouseStateClick !== this.oldMouseStateClick) {

			if (this.newMouseStateClick) {
				this.mouse.clicked = !this.mouse.held;
				this.mouse.held = true;
			} else {
				this.mouse.released = true;
				this.mouse.held = false;
			}
		}

		this.oldMouseStateClick = this.newMouseStateClick;

		this.keysToSupport.forEach(key => {

			this.newKeyState = this._isKeyPressed(key);

			this.input[key].pressed = false;
			this.input[key].released = false;

			if (this.newKeyState !== this.oldKeyState[key]) {

				if (this.newKeyState) {
					this.input[key].pressed = !this.input[key].held;
					this.input[key].held = true;
				} else {
					this.input[key].released = true;
					this.input[key].held = false;
				}
			}

			this.oldKeyState[key] = this.newKeyState;
		});
	}
	keyPressed(key) {
		return this.input[key].pressed;
	}
	keyHeld(key) {
		return this.input[key].held;
	}
	keyReleased(key) {
		return this.input[key].released;
	}
	_isKeyPressed(key) {
		return this.liveKeyStates.pressed[key];
	}
	_onMouseDown(event) {
		this.liveMouseState.click = true;
	}
	_onMouseUp(event) {
		this.liveMouseState.click = false;
	}
	_onKeydown(key) {
		if (this._keyIsSupported(key)) {
			this.liveKeyStates.pressed[key] = true;
		}
	}
	_onKeyup(key) {
		if (this._keyIsSupported(key)) {
			this.liveKeyStates.pressed[key] = false;
		}
	}
	_keyIsSupported(key) {
		return this.keysToSupport.includes(key);
	}
	_onMouseMove(event) {
		this.mouse.x = event.offsetX;
		this.mouse.y = event.offsetY;
	}
	_createKeys() {
		this.keysToSupport.forEach(key => this.input[key] = {
			pressed: false,
			held: false,
			released: false
		});
	}
}
