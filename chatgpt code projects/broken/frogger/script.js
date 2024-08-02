const frog = document.getElementById('frog');
const logs = document.getElementsByClassName('log');
const message = document.getElementById('message');

let gameOver = false;
let logSpeed = 2;
let frogSpeed = 10;
let logsPositions = [-100, 150, 400, 650, 900, 1150]; 
let onLog = false;
let currentLogSpeed = 0;

function moveLogs() {
    for (let i = 0; i < logs.length; i++) {
        logsPositions[i] -= logSpeed;
        if (logsPositions[i] < -100) {
            logsPositions[i] = 400;
        }
        logs[i].style.left = logsPositions[i] + 'px';
        logs[i].style.top = (i * 80 + 50) + 'px';
    }
}

function checkCollision() {
    const frogRect = frog.getBoundingClientRect();
    onLog = false;
    for (let i = 0; i < logs.length; i++) {
        const logRect = logs[i].getBoundingClientRect();
        if (
            frogRect.left < logRect.right &&
            frogRect.right > logRect.left &&
            frogRect.top < logRect.bottom &&
            frogRect.bottom > logRect.top
        ) {
            onLog = true;
            currentLogSpeed = logSpeed;
            return true;
        }
    }
    return false;
}

function moveFrog(event) {
    if (gameOver) return;

    switch (event.key) {
        case 'ArrowUp':
            frog.style.top = (frog.offsetTop - frogSpeed) + 'px';
            break;
        case 'ArrowDown':
            frog.style.top = (frog.offsetTop + frogSpeed) + 'px';
            break;
        case 'ArrowLeft':
            frog.style.left = (frog.offsetLeft - frogSpeed) + 'px';
            break;
        case 'ArrowRight':
            frog.style.left = (frog.offsetLeft + frogSpeed) + 'px';
            break;
    }

    if (frog.offsetTop <= 0) {
        message.textContent = 'You Win!';
        gameOver = true;
    } else if (!checkCollision() && frog.offsetTop < 450) {
        message.textContent = 'I Lose!';
        gameOver = true;
    }
}

function gameLoop() {
    if (!gameOver) {
        moveLogs();
        if (onLog) {
            frog.style.left = (frog.offsetLeft - currentLogSpeed) + 'px';
        } else if (frog.offsetTop < 450) {
            message.textContent = 'I Lose!';
            gameOver = true;
        }
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', moveFrog);
gameLoop();
