"use strict";

import consts from './consts.js';
import gameConfig from './config.js';
import Engine from './engine';

const SUPPORTED_KEYS = consts.SUPPORTED_KEYS;

const cWidth = gameConfig.width;
const cHeight = gameConfig.height;

const canvasElement = document.querySelector('canvas');

canvasElement.oncontextmenu = function (e) {
	e.preventDefault();
	e.stopPropagation();
};


const keysToSupport = [];

Object.keys(SUPPORTED_KEYS).forEach(key => keysToSupport.push(SUPPORTED_KEYS[key]));

const gameEngine = new Engine(canvasElement, cWidth, cHeight);

gameEngine.setupInput(keysToSupport);
gameEngine.setCurrentLoop(titleScreenLoop);

gameEngine.run();

const gameState = {};

function gameLoop(elapsedTime, c, input, Engine) {}

function titleScreenLoop(elapsedTime, c, input, Engine) {

	c.clearRect(0, 0, cWidth, cHeight);
	c.fillStyle = "#000000";
	c.fillRect(0, 0, cWidth, cHeight);

	c.textAlign = "center";
	c.font = '70px Arial';
	c.fillStyle = '#2fc62a';
	c.fillText("PIXEL SURVIVORS", cWidth / 2, cHeight / 3);

	c.textAlign = "center";
	c.font = '45px Arial';
	c.fillStyle = '#CB76FF';
	c.fillText("CLICK ANYWHERE TO START", cWidth / 2, cHeight / 3 + 75);

	if (input.mouse.released) Engine.setCurrentLoop(gameLoop);
}
