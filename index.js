"use strict";

const gameGround = document.querySelector("#gameGround");
const gameScore = document.querySelector("#gameScore");
const gameRestartBtn = document.querySelector("#gameRestartBtn");
const context = gameGround.getContext("2d"); //methods and properties to draw and do a lot of things to the canvas
const gameBackgroundColor = "black";
const gameWidth = gameGround.width;
const gameHeight = gameGround.height;
const ballProperties = {
    directionX : 0, //direction where ball will be moving in X axis
    directionY : 0, //direction where ball will be moving in Y axis
    X : gameWidth / 2, //default placement of the ball
    Y : gameHeight / 2, //default placement of the ball
    speed : 2,
    radius : 10,
    color : "green",
    borderColor : "black"
};
let player1Properties = {
    borderColor : "blue",
    color : "purple",
    speed : 40,
    height: 80,
    width: 20,
    x: 0,
    y: (gameHeight - 80) / 2,
};
let player2Properties = {
    borderColor : "green",
    color : "yellow",
    speed : 40,
    height: 80,
    width: 20,
    x: gameWidth - 20,
    y: (gameHeight - 80) / 2,
};
const scores = {
    player1Score : 0, //score before the game start
    player2Score : 0 //score before the game start
};
let interval;
const hit = new Audio("./sounds/hit.mp3");
const wall = new Audio("./sounds/wall.mp3");
const player1Scores = new Audio("./sounds/player1Scores.mp3");
const player2Scores = new Audio("./sounds/player2Scores.mp3");

function clearBoard() {
    context.fillStyle = gameBackgroundColor;
    context.fillRect(0, 0, gameWidth, gameHeight);
}
function drawBall(ballX, ballY) {
    context.fillStyle = ballProperties.color;
    context.strokeStyle = ballProperties.borderColor;
    context.beginPath();
    context.arc(ballProperties.X, ballProperties.Y, ballProperties.radius, 0, 2 * Math.PI); //drawing a circle with radius from const, and endAngle of 2 * PI
    context.closePath();
    context.stroke();
    context.fill();
}
function drawPaddles(x, y, width, height, borderColor, color){
    context.strokeStyle = borderColor;
    context.fillStyle = color;
    context.strokeRect(x, y, width, height);
    context.fillRect(x, y, width, height);

}


