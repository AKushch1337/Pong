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

gameStart();
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
    createBall();
    nextTick();
};

function clearBoard() {
    context.fillStyle = gameBackgroundColor;
    context.fillRect(0, 0, gameWidth, gameHeight);
};

function createBall() { //which way the ball moves when created
    ballSpeed = 1;
    Math.round(Math.random()) === 1 ? ballDirectionX = -1 : ballDirectionX = 1
    Math.round(Math.random()) === 1 ? ballDirectionY = -1 : ballDirectionY = 1
    ballX = gameWidth / 2; //to spawn in center of the board
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};

function drawBall(ballX, ballY) {
    context.fillStyle = ballColor;
    context.strokeStyle = ballBorderColor;
    context.beginPath();
    context.arc(ballX, ballY, ballDiameter / 2, 0, 2 * Math.PI); //drawing a circle with radius from const, and endAngle of 2 * PI
    context.stroke();
    context.fill();
};

function moveBall() {
    ballX += (ballSpeed * ballDirectionX);
    ballY += (ballSpeed * ballDirectionY);
};

function checkCollision() {
    if (ballX >= gameWidth) {
        player1Score += 1;
        updateGameScore();
        createBall();
        return;
    }
    if (ballX <= 0) {
        player2Score += 1;
        updateGameScore();
        createBall();
        return;
    }
    if (ballY >= gameHeight - (ballDiameter / 2)) {
        ballDirectionY *= -1;
    }
    if (ballY <= ballDiameter / 2) {
        ballDirectionY *= -1;
    }
    if (ballX <= (player1Properties.x + player1Properties.width + (ballDiameter / 2))) {
        if (ballY > player1Properties.y && ballY < player1Properties.y + player1Properties.height) {
            ballDirectionX *= -1;
        }
    }
    if (ballX >= (player2Properties.x - (ballDiameter / 2))) {
        if (ballY > player2Properties.y && ballY < player2Properties.y + player2Properties.height) {
            ballDirectionX *= -1;
        }
    }
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

function changeDirection() {
};

function updateGameScore() {
};

function gameCollision() {
};

function restartGame() {
};
