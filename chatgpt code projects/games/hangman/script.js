const words = ["javascript", "hangman", "coding", "html", "css"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingAttempts = 6;

const wordElement = document.getElementById("word");
const messageElement = document.getElementById("message");
const alphabetElement = document.getElementById("alphabet");
const resetButton = document.getElementById("reset");

function displayWord() {
    const wordDisplay = chosenWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
    wordElement.textContent = wordDisplay;
}

function displayAlphabet() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    alphabetElement.innerHTML = "";
    alphabet.forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.disabled = guessedLetters.includes(letter);
        button.addEventListener("click", () => guessLetter(letter));
        alphabetElement.appendChild(button);
    });
}

function guessLetter(letter) {
    guessedLetters.push(letter);
    if (!chosenWord.includes(letter)) {
        remainingAttempts--;
    }
    checkGameStatus();
    displayWord();
    displayAlphabet();
}

function checkGameStatus() {
    const wordDisplay = wordElement.textContent.replace(/ /g, "");
    if (wordDisplay === chosenWord) {
        messageElement.textContent = "You Win!";
        disableAlphabet();
    } else if (remainingAttempts === 0) {
        messageElement.textContent = `You Lose! The word was "${chosenWord}".`;
        disableAlphabet();
    } else {
        messageElement.textContent = `Remaining Attempts: ${remainingAttempts}`;
    }
}

function disableAlphabet() {
    const buttons = alphabetElement.querySelectorAll("button");
    buttons.forEach(button => (button.disabled = true));
}

function resetGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingAttempts = 6;
    messageElement.textContent = "";
    displayWord();
    displayAlphabet();
}

resetButton.addEventListener("click", resetGame);

displayWord();
displayAlphabet();
