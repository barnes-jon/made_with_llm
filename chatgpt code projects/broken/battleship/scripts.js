document.addEventListener('DOMContentLoaded', () => {
    const playerGrid = document.getElementById('player-grid');
    const opponentGrid = document.getElementById('opponent-grid');
    const startButton = document.getElementById('start-game');
    const resetButton = document.getElementById('reset-game');
    
    const width = 10;
    const playerBoard = [];
    const opponentBoard = [];
    
    function createBoard(grid, board) {
        for (let i = 0; i < width * width; i++) {
            const cell = document.createElement('div');
            cell.dataset.id = i;
            grid.appendChild(cell);
            board.push(cell);
        }
    }
    
    createBoard(playerGrid, playerBoard);
    createBoard(opponentGrid, opponentBoard);

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);

    function startGame() {
        // Initialize ships and game logic here
        placeShipsRandomly(playerBoard);
        placeShipsRandomly(opponentBoard);
    }

    function resetGame() {
        // Reset the game state here
        playerBoard.forEach(cell => cell.classList.remove('ship', 'hit', 'miss'));
        opponentBoard.forEach(cell => cell.classList.remove('ship', 'hit', 'miss'));
    }

    function placeShipsRandomly(board) {
        // Placeholder function for placing ships randomly
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * width * width);
            board[randomIndex].classList.add('ship');
        }
    }
    
    opponentGrid.addEventListener('click', function(event) {
        if (event.target.tagName === 'DIV' && !event.target.classList.contains('hit') && !event.target.classList.contains('miss')) {
            if (event.target.classList.contains('ship')) {
                event.target.classList.add('hit');
            } else {
                event.target.classList.add('miss');
            }
        }
    });
});
