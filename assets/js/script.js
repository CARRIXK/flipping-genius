const cards = {
    animals: [
        {
            id: 1,
            url: 'assets/images/ant.png',
        },
        {
            id: 2,
            url: 'assets/images/cat.png',
        },
        {
            id: 3,
            url: 'assets/images/cowpng.png',
        },
    ],
    fruits: [
        {
            id: 1,
            url: 'assets/images/apple.png',
        },
        {
            id: 2,
            url: 'assets/images/banana.png',
        },
        {
            id: 3,
            url: 'assets/images/cherry.png',
        },
    ],
    vehicles: [
        {
            id: 1,
            url: 'assets/images/car.png',
        },
        {
            id: 2,
            url: 'assets/images/bus.png',
        },
        {
            id: 3,
            url: 'assets/images/bike.png',
        },
    ]
};

let gameRows = 4;
let gameCols = 4;
let selectedCategory = 'animals';

document.getElementById('start-game').addEventListener('click', () => {
    createBoard(gameRows, gameCols, selectedCategory);
});

document.getElementById('difficulty-setting').addEventListener('change', (event) => {
    const difficulty = event.target.value;
    switch (difficulty) {
        case 'easy':
            gameRows = 4;
            gameCols = 4;
            break;
        case 'medium':
            gameRows = 6;
            gameCols = 6;
            break;
        case 'hard':
            gameRows = 8;
            gameCols = 8;
            break;
    }
    createBoard(gameRows, gameCols, selectedCategory);
});

document.getElementById('category-setting').addEventListener('change', (event) => {
    selectedCategory = event.target.value;
    createBoard(gameRows, gameCols, selectedCategory);
});

function createBoard(rows, cols, category) {
    // Get the game-board section
    const board = document.getElementById('game-board');
    // Clear any existing content
    board.innerHTML = '';

    // Create an array of card values with pairs
    const cardValues = [];
    const totalCards = rows * cols;
    const categoryCards = cards[category];
    const uniqueCards = categoryCards.length;

    for (let i = 0; i < totalCards / 2; i++) {
        cardValues.push(categoryCards[i % uniqueCards]);
        cardValues.push(categoryCards[i % uniqueCards]);
    }

    // Shuffle the card values
    cardValues.sort(() => 0.5 - Math.random());

    let cardIndex = 0;
    for (let row = 0; row < rows; row++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'game-row';

        for (let col = 0; col < cols; col++) {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.dataset.id = cardValues[cardIndex].id;

            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.style.backgroundImage = `url(${cardValues[cardIndex].url})`;

            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';

            card.appendChild(cardFront);
            card.appendChild(cardBack);
            card.addEventListener('click', flipCard);

            rowElement.appendChild(card);
            cardIndex++;
        }

        board.appendChild(rowElement);
    }
}



/**
 * 
 * Click event handler for which adds flipped class to clicked game card and compares flipped 
 * cards when the number of flipped cards is 2
 */
function flipCard(e) {
    // Flip card logic here
    // console.log(e.currentTarget);
    let card = e.currentTarget;
    card.classList.toggle('flipped');

    //when a card is flipped check if there is another card flipped
    let flippedCards = document.querySelectorAll(".flipped");
    increaseMatchCount()
    // if(flippedCards.length > 1){

    //     let firstCard = flippedCards[0];
    //     let secondCard = flippedCards[1];
        
    //     if(firstCard.firstChild.textContent === secondCard.firstChild.textContent){
    //         console.log("There is a match");
        
              
    //     }else{
    //         console.log("No match");
    //     }
    // }

}

function increaseMatchCount(){
    let newCount  = parseInt(document.getElementById("matchCount").innerText) + 1;
    document.getElementById("matchCount").innerText = newCount;
}



createBoard(gameRows, gameCols, selectedCategory);