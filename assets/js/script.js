const cards = [];

function createBoard(rows, cols) {
    // Get the game-board section
    const board = document.getElementById('game-board');
    // Clear any existing content
    board.innerHTML = '';

    for (let row = 0; row < rows; row++) {
        const row = document.createElement('div');
        row.className = 'row';

        for (let col = 0; col < cols; col++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.value = cards[row * 4 + col];
            card.addEventListener('click', flipCard);
            row.appendChild(card);
        }

        board.appendChild(row);
    }
}

function flipCard() {

}

createBoard(4, 4);