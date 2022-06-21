"use strict";

const gameGround = document.querySelector("#gameGround");
const gameScore = document.querySelector("#gameScore");
const gameRestartBtn = document.querySelector("#gameRestartBtn");
const context = gameGround.getContext("2d"); //methods and properties to draw and do a lot of things to the canvas
const gameBackgroundColor = "black";
const gameWidth = gameGround.width;
const gameHeight = gameGround.height;
const player1Color = "purple";
const player2Color = "yellow";
const playerBorder = "blue";
const ballDiameter = 20;
const ballColor = "green";
const ballBorderColor = "black";
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
    y: (gameHeight - 80) / 2,
};
let player2Properties = {
    height: 80,
    width: 20,
    x: gameWidth - 20,
    y: (gameHeight - 80) / 2,
};
let player1Score = 0; //score before the game start
let player2Score = 0; //score before the game start
let interval;
let hit = new Audio();
let wall = new Audio();
let player1Scores = new Audio();
let player2Scores = new Audio();
hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
player1Scores.src = "sounds/player1Scores.mp3";
player2Scores.src = "sounds/player2Scores.mp3";

gameRestartBtn.addEventListener("click", restartGame);
window.addEventListener("keydown", changeDirection);

gameStart();

function drawPaddles() {
    context.strokeStyle = playerBorder;

    context.fillStyle = player1Color;
    context.fillRect(
        player1Properties.x,
        player1Properties.y,
        player1Properties.width,
        player1Properties.height
    );
    context.strokeRect(
        player1Properties.x,
        player1Properties.y,
        player1Properties.width,
        player1Properties.height
    );

    context.fillStyle = player2Color;
    context.fillRect(
        player2Properties.x,
        player2Properties.y,
        player2Properties.width,
        player2Properties.height
    );
    context.strokeRect(
        player2Properties.x,
        player2Properties.y,
        player2Properties.width,
        player2Properties.height
    );
}

function gameStart() {
    drawPaddles();
    createBall();
    nextTick();
}

function clearBoard() {
    context.fillStyle = gameBackgroundColor;
    context.fillRect(0, 0, gameWidth, gameHeight);
}

function createBall() {
    //which way the ball moves when created
    ballSpeed = 3;
    Math.round(Math.random()) === 1
        ? (ballDirectionX = Math.random() * -1)
        : (ballDirectionX = Math.random() * 1); //more different angles where the ball can go when spawns
    Math.round(Math.random()) === 1
        ? (ballDirectionY = Math.random() * -1)
        : (ballDirectionY = Math.random() * 1);
    ballX = gameWidth / 2; //to spawn in center of the board
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
}

function drawBall(ballX, ballY) {
    context.fillStyle = ballColor;
    context.strokeStyle = ballBorderColor;
    context.beginPath();
    context.arc(ballX, ballY, ballDiameter / 2, 0, 2 * Math.PI); //drawing a circle with radius from const, and endAngle of 2 * PI
    context.stroke();
    context.fill();
}

function moveBall() {
    ballX += ballSpeed * ballDirectionX;
    ballY += ballSpeed * ballDirectionY;
}

function checkCollision() {
    if (ballX >= gameWidth) {
        player1Score += 1;
        player1Scores.play();
        updateGameScore();
        createBall();
        return;
    }
    if (ballX <= 0) {
        player2Score += 1;
        player2Scores.play();
        updateGameScore();
        createBall();
        return;
    }
    if (ballY >= gameHeight - ballDiameter / 2) {
        wall.play();
        ballDirectionY *= -1;
    }
    if (ballY <= ballDiameter / 2) {
        wall.play();
        ballDirectionY *= -1;
    }
    if (
        ballX <=
        player1Properties.x + player1Properties.width + ballDiameter / 2
    ) {
        if (
            ballY > player1Properties.y &&
            ballY < player1Properties.y + player1Properties.height
        ) {
            hit.play();
            ballDirectionX *= -1;
        }
    }
    if (ballX >= player2Properties.x - ballDiameter / 2) {
        if (
            ballY > player2Properties.y &&
            ballY < player2Properties.y + player2Properties.height
        ) {
            hit.play();
            ballDirectionX *= -1;
        }
    }
}

function nextTick() {
    interval = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 5);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const wKey = 87;
    const sKey = 83;
    const arrowUp = 38;
    const arrowDown = 40;

    switch (keyPressed) {
        case wKey:
            if (player1Properties.y > 0) {
                player1Properties.y -= playerSpeed;
            }
            break;
        case sKey:
            if (player1Properties.y < gameHeight - player1Properties.height) {
                player1Properties.y += playerSpeed;
            }
            break;
        case arrowUp:
            if (player2Properties.y > 0) {
                player2Properties.y -= playerSpeed;
            }
            break;
        case arrowDown:
            if (player2Properties.y < gameHeight - player2Properties.height) {
                player2Properties.y += playerSpeed;
            }
            break;
    }
}

function updateGameScore() {
    gameScore.textContent = `${player1Score} : ${player2Score}`;
}

function restartGame() {
    player1Score = 0;
    player2Score = 0;
    player1Properties.x = 0;
    player1Properties.y = (gameHeight - 80) / 2;
    player2Properties.x = gameWidth - 20;
    player2Properties.y = (gameHeight - 80) / 2;
    ballX = 0;
    ballY = 0;
    ballDirectionX = 0;
    ballDirectionY = 0;
    updateGameScore();
    clearInterval(interval);
    gameStart();
}
