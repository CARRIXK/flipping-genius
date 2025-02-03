const cards = [];

function createBoard(rows, cols) {
    // Get the game-board section
    const board = document.getElementById('game-board');
    // Clear any existing content
    board.innerHTML = '';

    for (let row = 0; row < rows; row++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'game-row';

        for (let col = 0; col < cols; col++) {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.dataset.value = cards[row * cols + col];

            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.innerText = cards[row * cols + col]; // This should be the image for the card

            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';

            card.appendChild(cardFront);
            card.appendChild(cardBack);
            card.addEventListener('click', flipCard);

            rowElement.appendChild(card);
        }

        board.appendChild(rowElement);
    }
}

function flipCard() {

}

createBoard(4, 4);