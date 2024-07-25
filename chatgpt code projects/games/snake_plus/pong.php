<h2>Pong Game</h2>
<canvas id="pongCanvas" width="400" height="300"></canvas>
<script>
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');

    const paddleHeight = 60;
    const paddleWidth = 10;
    let leftPaddleY = (canvas.height - paddleHeight) / 2;
    let rightPaddleY = (canvas.height - paddleHeight) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballDX = 2;
    let ballDY = 2;
    const ballRadius = 5;

    function drawPaddle(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, paddleWidth, paddleHeight);
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    function movePaddles() {
        if (ballY > leftPaddleY + paddleHeight / 2) {
            leftPaddleY += 2;
        } else {
            leftPaddleY -= 2;
        }

        canvas.addEventListener('mousemove', (e) => {
            const relativeY = e.clientY - canvas.offsetTop;
            if (relativeY > 0 && relativeY < canvas.height) {
                rightPaddleY = relativeY - paddleHeight / 2;
            }
        });
    }

    function updateBall() {
        if (ballY + ballDY > canvas.height - ballRadius || ballY + ballDY < ballRadius) {
            ballDY = -ballDY;
        }

        if (
            (ballX + ballDX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
            (ballX + ballDX > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
        ) {
            ballDX = -ballDX;
        }

        if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
        }

        ballX += ballDX;
        ballY += ballDY;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawPaddle(0, leftPaddleY);
        drawPaddle(canvas.width - paddleWidth, rightPaddleY);
        drawBall();
        
        movePaddles();
        updateBall();
        
        requestAnimationFrame(draw);
    }

    draw();
</script>