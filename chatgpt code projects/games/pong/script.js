const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 100;
const paddleWidth = 10;
const ballRadius = 10;

let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let playerSpeed = 10;
let maxSpeed = 20; // Maximum speed for the paddle

// To keep track of key states
const keys = {};

// Draw the paddles, ball, and the net
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawNet();

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight);

    ctx.fillStyle = '#fff';
    ctx.fillRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight);

    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

// Draw the net
function drawNet() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height);
}

// Update the positions of the ball and paddles
function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballRadius < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
        resetBall();
    }

    // Move computer paddle
    if (computerY + paddleHeight / 2 < ballY) {
        computerY += playerSpeed;
    } else {
        computerY -= playerSpeed;
    }

    if (computerY < 0) {
        computerY = 0;
    } else if (computerY + paddleHeight > canvas.height) {
        computerY = canvas.height - paddleHeight;
    }

    // Adjust player speed based on key states
    if (keys['ArrowUp']) {
        playerY -= playerSpeed;
        playerSpeed = Math.min(playerSpeed + 1, maxSpeed);
    } else if (keys['ArrowDown']) {
        playerY += playerSpeed;
        playerSpeed = Math.min(playerSpeed + 1, maxSpeed);
    } else {
        playerSpeed = 10; // Reset speed when no key is pressed
    }
}

// Reset the ball to the center of the canvas
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

// Track key presses
function keyDownHandler(event) {
    keys[event.key] = true;
}

function keyUpHandler(event) {
    keys[event.key] = false;
}

// Main game loop
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
gameLoop();
