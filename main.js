const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVel = 0;
let yVel = 0;

let score = 0;

const gulpSound = new Audio("gulp.mp3");

function drawGame() {
    changeSnakePos();
    let result = isGameOver();
    if (result) return true;

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    if (score > 2) {
        speed = 9;
    }
    if (score > 5) {
        speed = 11;
    }
    if (score > 10) {
        speed = 15;
    }
    if (score > 15) {
        speed = 18;
    }
    if (score > 20) {
        speed = 22;
    }

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    if (yVel === 0 & xVel === 0) return false;

    // walls
    if (headX < 0) {
        gameOver = true;
    } else if (headX >= tileCount) {
        gameOver = true;
    } else if (headY < 0) {
        gameOver = true;
    } else if (headY >= tileCount) {
        gameOver = true;
    } else {
        gameOver = false;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width / 7.5, canvas.height / 2);
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score: " + score, canvas.width / 50, 15);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new snakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function changeSnakePos() {
    headX = headX + xVel;
    headY = headY + yVel;
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

document.addEventListener('keydown', keyDown);

function keyDown(event) {
    // up
    if (event.keyCode == 38) {
        if (yVel == 1) return;
        yVel = -1;
        xVel = 0;
    }

    // down
    if (event.keyCode == 40) {
        if (yVel == -1) return;
        yVel = 1;
        xVel = 0;
    }

    // left
    if (event.keyCode == 37) {
        if (xVel == 1) return;
        yVel = 0;
        xVel = -1;
    }

    // right
    if (event.keyCode == 39) {
        if (xVel == -1) return;
        yVel = 0;
        xVel = 1;
    }
}

drawGame();

