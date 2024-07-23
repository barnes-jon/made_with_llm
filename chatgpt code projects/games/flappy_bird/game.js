const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variables
let gap = 85;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1.5*0.8;

let score = 0;

// Key press event
document.addEventListener('keydown', moveUp);

function moveUp() {
    bY -= 25*1.25;
}

// Pipe coordinates
let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.beginPath();
    ctx.arc(bX, bY, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();

    for (let i = 0; i < pipe.length; i++) {
        constant = 100 + gap;
        
        // Draw pipes
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe[i].x, pipe[i].y, 50, 100);
        ctx.fillRect(pipe[i].x, pipe[i].y + constant, 50, canvas.height - pipe[i].y - constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * 100) - 100
            });
        }

        // Detect collision
        if (bX + 10 >= pipe[i].x && bX - 10 <= pipe[i].x + 50 && (bY - 10 <= pipe[i].y + 100 || bY + 10 >= pipe[i].y + constant) || bY + 10 >= canvas.height) {
            location.reload(); // Reload the page
        }

        if (pipe[i].x == 5) {
            score++;
        }
    }

    bY += gravity;

    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText('Score : ' + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
