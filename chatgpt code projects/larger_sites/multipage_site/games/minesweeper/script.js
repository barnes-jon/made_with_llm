let rows = 10;
let cols = 10;
let mineCount = 10; // Default mine count
let board = [];
let revealed = [];
let mines = [];
let flagged = [];
let gameOver = false;
let remainingMines = mineCount;
let timer;
let startTime;
let elapsedTime = 0;

function createBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';
    board = [];
    revealed = [];
    flagged = [];
    mines = [];
    gameOver = false;
    remainingMines = mineCount;

    document.getElementById('count').textContent = remainingMines;
    document.getElementById('time').textContent = '0';
    document.getElementById('message').textContent = '';

    // Set grid-template-columns based on the number of columns
    boardElement.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

    // Add class for large board scaling
    if (cols === 12) {
        boardElement.classList.add('large-board');
    } else {
        boardElement.classList.remove('large-board');
    }

    // Initialize the board
    for (let r = 0; r < rows; r++) {
        board[r] = [];
        revealed[r] = [];
        flagged[r] = [];
        for (let c = 0; c < cols; c++) {
            board[r][c] = 0;
            revealed[r][c] = false;
            flagged[r][c] = false;
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', onCellClick);
            cell.addEventListener('contextmenu', onCellRightClick);
            boardElement.appendChild(cell);
        }
    }

    // Place mines
    placeMines();
    toggleMineAdjustControls(false);
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (board[r][c] === 0) {
            board[r][c] = -1; // -1 represents a mine
            minesPlaced++;
            mines.push({ r, c });
            updateNeighborCounts(r, c);
        }
    }
}

function updateNeighborCounts(row, col) {
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] !== -1) {
                board[r][c]++;
            }
        }
    }
}

function revealCell(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols || revealed[row][col] || flagged[row][col]) return;

    revealed[row][col] = true;
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (board[row][col] === -1) {
        cell.classList.add('mine');
        cell.textContent = '💣';
        gameOver = true;
        document.getElementById('message').textContent = 'Game Over!';
        revealAllMines();
    } else {
        cell.classList.add('revealed');
        cell.textContent = board[row][col] > 0 ? board[row][col] : '';
        if (board[row][col] === 0) {
            for (let r = row - 1; r <= row + 1; r++) {
                for (let c = col - 1; c <= col + 1; c++) {
                    revealCell(r, c);
                }
            }
        }
    }

    checkWin();
}

function revealAllMines() {
    mines.forEach(mine => {
        const cell = document.querySelector(`.cell[data-row="${mine.r}"][data-col="${mine.c}"]`);
        cell.classList.add('mine');
        cell.textContent = '💣';
    });
}

function checkWin() {
    if (gameOver) return;

    let revealedCount = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (revealed[r][c]) {
                revealedCount++;
            }
        }
    }

    if (revealedCount === rows * cols - mineCount) {
        document.getElementById('message').textContent = 'You Win!';
        gameOver = true;
        toggleMineAdjustControls(false);
    }
}

function onCellClick(event) {
    if (gameOver) return;
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    
    if (!startTime) {
        startTime = Date.now();
        timer = setInterval(updateClock, 1000);
    }
    
    revealCell(row, col);
}

function onCellRightClick(event) {
    event.preventDefault();
    if (gameOver) return;
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (!revealed[row][col]) {
        if (flagged[row][col]) {
            cell.classList.remove('flagged');
            flagged[row][col] = false;
            remainingMines++;
        } else {
            cell.classList.add('flagged');
            flagged[row][col] = true;
            remainingMines--;
        }
        document.getElementById('count').textContent = remainingMines;
    }
}

function updateClock() {
    if (gameOver) {
        clearInterval(timer);
        return;
    }
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('time').textContent = elapsedTime;
}

function resetGame() {
    startTime = null;
    elapsedTime = 0;
    document.getElementById('time').textContent = '0';
    clearInterval(timer);
    createBoard();
    document.getElementById('message').textContent = ''; // Clear the message on reset
}

function changeBoardSize(size) {
    switch (size) {
        case 'small':
            rows = 8;
            cols = 8;
            mineCount = 10;
            break;
        case 'medium':
            rows = 10;
            cols = 10;
            mineCount = 15;
            break;
        case 'large':
            rows = 15;
            cols = 45;
            mineCount = 60;
            break;
    }
    resetGame();
}

function toggleMineAdjustControls(show) {
    document.getElementById('mine-adjust-controls').style.display = show ? 'flex' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    createBoard();

    // Add event listener to reset button
    document.getElementById('reset-btn').addEventListener('click', resetGame);

    // Add event listeners to size buttons
    document.querySelectorAll('#size-buttons button').forEach(button => {
        button.addEventListener('click', () => changeBoardSize(button.dataset.size));
    });
});
