document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const birdNames = ['crow', 'robin', 'sparrow', 'eagle', 'hawk', 'owl', 'peacock', 'pigeon'];
    let cardValues = [...birdNames, ...birdNames];
    let firstCard = null;
    let secondCard = null;
    let matchesFound = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffle(cardValues);
        board.innerHTML = '';
        cardValues.forEach((value) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;
            card.addEventListener('click', handleCardClick);
            board.appendChild(card);
        });
    }

    function handleCardClick(event) {
        const clickedCard = event.target;
        if (clickedCard === firstCard || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
            return;
        }

        clickedCard.textContent = clickedCard.dataset.value;
        clickedCard.classList.add('flipped');

        if (!firstCard) {
            firstCard = clickedCard;
        } else {
            secondCard = clickedCard;
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchesFound++;
            resetTurn();
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard.textContent = '';
                secondCard.textContent = '';
                resetTurn();
            }, 1000);
        }

        if (matchesFound === birdNames.length) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }
    }

    function resetTurn() {
        firstCard = null;
        secondCard = null;
    }

    function resetGame() {
        cardValues = [...birdNames, ...birdNames];
        matchesFound = 0;
        createBoard();
    }

    resetButton.addEventListener('click', resetGame);

    createBoard();
});
