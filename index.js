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
const ballDiameter = 20;
const ballColor = 'green';
const ballBorderColor = 'black';
const playerSpeed = 40; //how fast do paddles move
let ballDirectionX = 0; //direction where ball will be moving in X axis
let ballDirectionY = 0; //direction where ball will be moving in Y axis
let ballX = gameWidth / 2; //default placement of the ball
let ballY = gameHeight / 2; //default placement of the ball
let ballSpeed = 1;
let player1Properties = {
    height: 80,
    width: 20,
    x: 0,
    y: gameHeight / 2
};
let player2Properties = {
    height: 80,
    width: 20,
    x: gameWidth - 20,
    y: (gameHeight - 80) / 2
};
let player1Score = 0; //score before the game start
let player2Score = 0; //score before the game start
let interval; //

