<h2>Minesweeper</h2>
<div id="minesweeper"></div>
<script>
    const minesweeperContainer = document.getElementById('minesweeper');
    const gridSize = 10;
    const mineCount = 15;
    let grid = [];
    let revealed = [];

    function createGrid() {
        grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
        revealed = Array(gridSize).fill().map(() => Array(gridSize).fill(false));

        // Place mines
        for (let i = 0; i < mineCount; i++) {
            let x, y;
            do {
                x = Math.floor(Math.random() * gridSize);
                y = Math.floor(Math.random() * gridSize);
            } while (grid[y][x] === -1);
            grid[y][x] = -1;

            // Update adjacent cells
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (x + dx >= 0 && x + dx < gridSize && y + dy >= 0 && y + dy < gridSize && grid[y + dy][x + dx] !== -1) {
                        grid[y + dy][x + dx]++;
                    }
                }
            }
        }
    }

    function renderGrid() {
        minesweeperContainer.innerHTML = '';
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const cell = document.createElement('div');
                cell.style.width = '30px';
                cell.style.height = '30px';
                cell.style.border = '1px solid #ccc';
                cell.style.display = 'inline-block';
                cell.style.textAlign = 'center';
                cell.style.verticalAlign = 'middle';
                cell.style.lineHeight = '30px';
                cell.style.cursor = 'pointer';

                if (revealed[y][x]) {
                    if (grid[y][x] === -1) {
                        cell.textContent = '💣';
                    } else if (grid[y][x] > 0) {
                        cell.textContent = grid[y][x];
                    }
                } else {
                    cell.style.backgroundColor = '#ddd';
                }

                cell.addEventListener('click', () => revealCell(x, y));
                minesweeperContainer.appendChild(cell);
            }
            minesweeperContainer.appendChild(document.createElement('br'));
        }
    }

    function revealCell(x, y) {
        if (revealed[y][x]) return;
        revealed[y][x]