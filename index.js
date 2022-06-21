'use strict';

const gameGround = document.querySelector('#gameGround');
const gameScore = document.querySelector('#gameScore');
const gameRestartBtn = document.querySelector('#gameRestartBtn');
const context = gameGround.getContext('2d');
const gameBackgroundColor = 'red';
const gameWidth = gameGround.width;
const gameHeight = gameGround.height;
const player1Color = "purple";
const player2Color = "black";
const playerBorder = 'blue';
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
    y: (gameHeight - 80) / 2
};
let player2Properties = {
    height: 80,
    width: 20,
    x: gameWidth - 20,
    y: (gameHeight - 80) / 2
};
let player1Score = 0; //score before the game start
let player2Score = 0; //score before the game start
let interval;

// window.addEventListener('keydown', changeDirection); // eventListeners for latter functions
// gameRestartBtn.addEventListener('click', restartGame);

drawPaddles();

function drawPaddles() {
    context.strokeStyle = playerBorder;

    context.fillStyle = player1Color;
    context.fillRect(player1Properties.x, player1Properties.y, player1Properties.width, player1Properties.height);
    context.strokeRect(player1Properties.x, player1Properties.y, player1Properties.width, player1Properties.height);

    context.fillStyle = player2Color;
    context.fillRect(player2Properties.x, player2Properties.y, player2Properties.width, player2Properties.height);
    context.strokeRect(player2Properties.x, player2Properties.y, player2Properties.width, player2Properties.height);
};

function gameStart() {
};

function clearBoard() {
};

function createBall() {
};

function drawBall() {
};

function moveBall() {
};

function checkCollision() {
};

function nextTick() {
    interval = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 5)
};

