const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snakePart {
    constructor(x,y) {
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

function drawGame() {
    clearScreen();
    changeSnakePos();
    

    checkAppleCollision();
    drawApple();
    drawSnake();
    setTimeout(drawGame, 1000/speed);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake() {

    ctx.fillStyle='green';
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new snakePart(headX, headY));
    if(snakeParts.length > tailLength) {
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
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
    }
}

document.addEventListener('keydown', keyDown);

function keyDown(event) {
    // up
    if (event.keyCode == 38) {
        if(yVel == 1) return;
        yVel = -1;
        xVel = 0;
    }

    // down
    if (event.keyCode == 40) {
        if(yVel == -1) return;
        yVel = 1;
        xVel = 0;
    }

    // left
    if (event.keyCode == 37) {
        if(xVel == 1) return;
        yVel = 0;
        xVel = -1;
    }

    // right
    if (event.keyCode == 39) {
        if(xVel == -1) return;
        yVel = 0;
        xVel = 1;
    }
}

drawGame();

