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
  animals: [
    {
      id: 1,
      url: "assets/images/ant.png",
    },
    {
      id: 2,
      url: "assets/images/cat.png",
    },
    {
      id: 3,
      url: "assets/images/cowpng.png",
    },
  ],
  fruits: [
    {
      id: 1,
      url: "assets/images/apple.png",
    },
    {
      id: 2,
      url: "assets/images/banana.png",
    },
    {
      id: 3,
      url: "assets/images/cherry.png",
    },
  ],
  clours: [
    {
      id: 1,
      url: "assets/images/brown.jpeg",
    },
    {
      id: 2,
      url: "assets/images/black.jpeg",
    },
    {
      id: 3,
      url: "assets/images/white.jpeg",
    },
  ],
};

let gameRows = 4;
let gameCols = 4;
let selectedCategory = 'animals';
let selectedCategory = "animals";

document.getElementById('start-game').addEventListener('click', () => {
    createBoard(gameRows, gameCols, selectedCategory);
document.getElementById("start-game").addEventListener("click", () => {
  createBoard(gameRows, gameCols, selectedCategory);
});

document.getElementById('difficulty-setting').addEventListener('change', (event) => {
document
  .getElementById("difficulty-setting")
  .addEventListener("change", (event) => {
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
      case "easy":
        gameRows = 4;
        gameCols = 4;
        break;
      case "medium":
        gameRows = 6;
        gameCols = 6;
        break;
      case "hard":
        gameRows = 8;
        gameCols = 8;
        break;
    }
    createBoard(gameRows, gameCols, selectedCategory);
});
  });

document.getElementById('category-setting').addEventListener('change', (event) => {
document
  .getElementById("category-setting")
  .addEventListener("change", (event) => {
    selectedCategory = event.target.value;
    createBoard(gameRows, gameCols, selectedCategory);
});
  });
function populateCategoryDropdown() {
  const categoryDropdown = document.getElementById("category-setting");
  categoryDropdown.innerHTML = ""; // Clear existing options
  Object.keys(cards).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryDropdown.appendChild(option);
  });
}

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
  // Get the game-board section
  const board = document.getElementById("game-board");
  // Clear any existing content
  board.innerHTML = "";
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
    const rowElement = document.createElement("div");
    rowElement.className = "game-row";
    for (let col = 0; col < cols; col++) {
      const card = document.createElement("div");
      card.className = "game-card";
      card.dataset.id = cardValues[cardIndex].id;
      const cardFront = document.createElement("div");
      cardFront.className = "card-front";
      cardFront.style.backgroundImage = `url(${cardValues[cardIndex].url})`;
      const cardBack = document.createElement("div");
      cardBack.className = "card-back";
      card.appendChild(cardFront);
      card.appendChild(cardBack);
      card.addEventListener("click", flipCard);
      // Add a delay to the animation for each card
      card.style.animationDelay = `${cardIndex * 0.1}s`;
      rowElement.appendChild(card);
      cardIndex++;
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
    board.appendChild(rowElement);
  }
}


@@ -184,13 +203,22 @@ function flipCard(e) {
        console.log(`Only ${flippedCards.length} card has been flipped`);
    }

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

// Populate the category dropdown on page load
populateCategoryDropdown();

createBoard(gameRows, gameCols, selectedCategory);
// Create the initial board
createBoard(gameRows, gameCols, selectedCategory);


// audio files
const ShuffleSound = new Audio('assets/sounds/cardshuffle.mp3');
const flipSound = new Audio('assets/sounds/flipcard.mp3');
const matchSound = new Audio('assets/sounds/matchcard.mp3');
const winSound = new Audio('assets/sounds/levelwin.mp3');
const gameOverSound = new Audio('assets/sounds/gameover.mp3');

function playShuffleSound = () => {    
    ShuffleSound.play();
}
function playFlipSound = () => {
  flipSound.play();
}

function playMatchSound = () =>{
  matchSound.play();
}

function playwinSound = () => {
    winSound.play();
}

function playGameOverSound = () => {
    gameOverSound.play();
}


// Get the audio element and the button
const audio = document.getElementById('myAudio');
const muteButton = document.getElementById('muteButton');

// Add an event listener to the button
muteButton.addEventListener('click', function() {
    if (audio.muted) {
        audio.muted = false;
        muteButton.textContent = 'Mute';
    } else {
        audio.muted = true;
        muteButton.textContent = 'Unmute';
    }
});
