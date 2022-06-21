'use strict';

const gameGround = document.querySelector('#gameGround');
const gameScore = document.querySelector('#gameScore');
const gameRestartBtn = document.querySelector('#gameRestartBtn');
const context = gameGround.getContext('2d');
const gameBackgroundColor = 'red';
const gameWidth = gameGround.width;
const gameHeight = gameGround.height;
const player1Color = "white";
const player2Color = "black";