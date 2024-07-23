let words = ["apple", "grape", "pearl", "flame", "beach"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let attempts = 6;

function updateWordList() {
    const wordInput = document.getElementById("word-input").value;
    words = wordInput.split(',').map(word => word.trim());
    chosenWord = words[Math.floor(Math.random() * words.length)];
    resetGame();
}

function submitWord() {
    const userInput = document.getElementById("user-input").value.toLowerCase();
    if (userInput.length !== 5) {
        document.getElementById("message").textContent = "Please enter a 5-letter word.";
        return;
    }
    
    const gameBoard = document.getElementById("game-board");
    const row = document.createElement("div");
    row.className = "row";
    
    let correctCount = 0;

    for (let i = 0; i < 5; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = userInput[i];

        if (userInput[i] === chosenWord[i]) {
            cell.classList.add("correct");
            correctCount++;
        } else if (chosenWord.includes(userInput[i])) {
            cell.classList.add("present");
        } else {
            cell.classList.add("absent");
        }
        
        row.appendChild(cell);
    }
    
    gameBoard.appendChild(row);
    attempts--;

    if (correctCount === 5) {
        document.getElementById("message").textContent = "Congratulations! You've guessed the word.";
    } else if (attempts === 0) {
        document.getElementById("message").textContent = `Game over! The word was: ${chosenWord}`;
    } else {
        document.getElementById("message").textContent = `You have ${attempts} attempts left.`;
    }
}

function resetGame() {
    document.getElementById("game-board").innerHTML = "";
    document.getElementById("message").textContent = "";
    document.getElementById("user-input").value = "";
    attempts = 6;
    chosenWord = words[Math.floor(Math.random() * words.length)];
}
