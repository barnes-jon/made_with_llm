<h2>Snake Game</h2>
<div id="snake-game">
    <!-- Snake game will be inserted here by JavaScript -->
</div>
<script>
    // Basic Snake game implementation
    const snakeGame = document.getElementById('snake-game');
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 1;
    let dy = 0;

    function drawGame() {
        snakeGame.innerHTML = '';
        const gameBoard = document.createElement('div');
        gameBoard.style.display = 'grid';
        gameBoard.style.gridTemplateColumns = 'repeat(20, 20px)';
        
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 20; x++) {
                const cell = document.createElement('div');
                cell.style.width = '20px';
                cell.style.height = '20px';
                cell.style.border = '1px solid #ccc';
                
                if (x === food.x && y === food.y) {
                    cell.style.backgroundColor = 'red';
                } else if (snake.some(segment => segment.x === x && segment.y === y)) {
                    cell.style.backgroundColor = 'green';
                }
                
                gameBoard.appendChild(cell);
            }
        }
        
        snakeGame.appendChild(gameBoard);
    }

    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        
        if (head.x === food.x && head.y === food.y) {
            food = {
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 20)
            };
        } else {
            snake.pop();
        }
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp': dx = 0; dy = -1; break;
            case 'ArrowDown': dx = 0; dy = 1; break;
            case 'ArrowLeft': dx = -1; dy = 0; break;
            case 'ArrowRight': dx = 1; dy = 0; break;
        }
    });

    setInterval(() => {
        moveSnake();
        drawGame();
    }, 200);

    drawGame();
</script>