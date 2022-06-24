"use strict";

const gameGround = document.querySelector("#gameGround");
const gameScore = document.querySelector("#gameScore");
const gameRestartBtn = document.querySelector("#gameRestartBtn");
const context = gameGround.getContext("2d"); //methods and properties to draw and do a lot of things to the canvas
const gameBackgroundColor = "black";
const gameWidth = gameGround.width;
const gameHeight = gameGround.height;
const playerSpeed = 40;
const ballProperties = {
    directionX: 4,
    directionY: 4,
    x: gameWidth / 2, //default placement of the ball
    y: gameHeight / 2, //default placement of the ball
    speed: 4,
    radius: 10,
    color: "green",
    borderColor: "white"
};
const player1Properties = {
    borderColor: "white",
    color: "purple",
    speed: 40,
    height: 100,
    width: 10,
    x: 0,
    y: (gameHeight - 100) / 2,
};
const player2Properties = {
    borderColor: "white",
    color: "blue",
    speed: 40,
    height: 100,
    width: 10,
    x: gameWidth - 10,
    y: (gameHeight - 100) / 2,
};
const scores = {
    player1Score: 0, //score before the game start
    player2Score: 0 //score before the game start
};
const hit = new Audio("./sounds/hit.mp3");
const wall = new Audio("./sounds/wall.mp3");
const player1Scores = new Audio("./sounds/player1Scores.mp3");
const player2Scores = new Audio("./sounds/player2Scores.mp3");

const clearBoard = () => {
    context.fillStyle = gameBackgroundColor;
    context.fillRect(0, 0, gameWidth, gameHeight);
}

const drawBall = (color, borderColor, x, y, radius) => {
    context.fillStyle = color;
    context.strokeStyle = borderColor;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI); //drawing a circle with radius from const, and endAngle of 2 * PI
    context.closePath();
    context.stroke();
    context.fill();
}

const drawPaddle = (x, y, width, height, borderColor, color) => {
    context.strokeStyle = borderColor;
    context.fillStyle = color;
    context.strokeRect(x, y, width, height);
    context.fillRect(x, y, width, height);

}

const resetBallPos = () => {
    ballProperties.speed = 3;
    ballProperties.x = gameWidth / 2;
    ballProperties.y = gameHeight / 2;
    ballProperties.directionX = 4;
    ballProperties.directionY = 4;
}

const resetPlayerPos = () => {
    player1Properties.x = 0;
    player1Properties.y = (gameHeight - 10) / 2;
    player2Properties.x = gameWidth - 10;
    player2Properties.y = (gameHeight - 10) / 2;
}

const updateGameScore = () => {
    gameScore.textContent = `${scores.player1Score} : ${scores.player2Score}`;
};


const checkCollision = (ball, player) => {
    //checking if the collision happens, return true of false
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
}

const updatePosition = () => {
    //if player scores adds to his score and resets ball position
    if (ballProperties.x < 0) {
        scores.player2Score++;
        player2Scores.play();
        updateGameScore();
        resetBallPos();
    } else if (ballProperties.x > gameWidth) {
        scores.player1Score++;
        player1Scores.play();
        updateGameScore();
        resetBallPos();
    }

    // ball velocity
    ballProperties.x += ballProperties.directionX;
    ballProperties.y += ballProperties.directionY;

    // inverse directionY when hits walls
    if (ballProperties.y - ballProperties.radius < 0 || ballProperties.y + ballProperties.radius > gameHeight) {
        ballProperties.directionY = -ballProperties.directionY;
        wall.play();
    }

    // we check if the paddle hits player1 or player2
    let player = (ballProperties.x + ballProperties.radius < gameWidth / 2) ? player1Properties : player2Properties;

    // if the ball hits a paddle
    if (checkCollision(ballProperties, player)) {
        hit.play();
        let collidePoint = (ballProperties.y - (player.y + player.height / 2)); //where the ball hits the paddle
        collidePoint = collidePoint / (player.height / 2); //getting number from -1 to 1

        let angleBounce = (Math.PI / 4) * collidePoint;         // we determine at which angle we want our ball to bounce off(45,0,-45 degrees)

        // change the X and Y velocity direction
        let direction = (ballProperties.x + ballProperties.radius < gameWidth / 2) ? 1 : -1;
        ballProperties.directionX = direction * ballProperties.speed * Math.cos(angleBounce);
        ballProperties.directionY = ballProperties.speed * Math.sin(angleBounce);

        // speed up the ball every time it hits the paddle
        ballProperties.speed += 1;
    }
}

const drawObjects = () => {

    //use func clearBoard
    clearBoard();

    //draw ball
    drawBall(ballProperties.color, ballProperties.borderColor, ballProperties.x, ballProperties.y, ballProperties.radius);

    //draw player1 paddle
    drawPaddle(player1Properties.x, player1Properties.y, player1Properties.width, player1Properties.height, player1Properties.borderColor, player1Properties.color);

    //draw player2 paddle
    drawPaddle(player2Properties.x, player2Properties.y, player2Properties.width, player2Properties.height, player2Properties.borderColor, player2Properties.color);
}
onkeydown = (event) => {
    const keyPressed = event.code;
    const player1Up = "KeyW";
    const player1Down = "KeyS";
    const player2Up = "ArrowUp";
    const player2Down = "ArrowDown";

    switch (keyPressed) {
        case(player1Up):
            if (player1Properties.y > 0) {
                player1Properties.y -= playerSpeed;
            }
            break;
        case(player1Down):
            if (player1Properties.y < gameHeight - player1Properties.height) {
                player1Properties.y += playerSpeed;
            }
            break;
        case(player2Up):
            if (player2Properties.y > 0) {
                player2Properties.y -= playerSpeed;
            }
            break;
        case(player2Down):
            if (player2Properties.y < gameHeight - player2Properties.height) {
                player2Properties.y += playerSpeed;
            }
            break;
    }
}

const gameStart = () => {
    updatePosition();
    drawObjects();
}
let FPS = 50;
setInterval(gameStart, 1000 / FPS);


