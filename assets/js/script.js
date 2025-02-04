const cards = {
  animals: {
    1: "🐶",
    2: "🐱",
    3: "🐭",
    4: "🐹",
    5: "🐰",
    6: "🦊",
    7: "🐻",
    8: "🐼",
  },
  fruits: {
    1: "🍎",
    2: "🍌",
    3: "🍇",
    4: "🍉",
    5: "🍓",
    6: "🍒",
    7: "🍑",
    8: "🍍",
  },
  colours: {
    1: "🚗",
    2: "🚕",
    3: "🚙",
    4: "🚌",
    5: "🚎",
    6: "🏎️",
    7: "🚓",
    8: "🚑",
  },
};

let gameRows = 4;
let gameCols = 4;
let selectedCategory = "animals";

document.getElementById("start-game").addEventListener("click", () => {
  createBoard(gameRows, gameCols, selectedCategory);
});

document
  .getElementById("difficulty-setting")
  .addEventListener("change", (event) => {
    const difficulty = event.target.value;
    switch (difficulty) {
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

document
  .getElementById("category-setting")
  .addEventListener("change", (event) => {
    selectedCategory = event.target.value;
    createBoard(gameRows, gameCols, selectedCategory);
  });

function createBoard(rows, cols, category) {
  // Get the game-board section
  const board = document.getElementById("game-board");
  // Clear any existing content
  board.innerHTML = "";

  // Create an array of card values with pairs
  const cardValues = [];
  const totalCards = rows * cols;
  const categoryCards = cards[category];
  const uniqueCards = Object.keys(categoryCards).length;

  for (let i = 1; i <= totalCards / 2; i++) {
    cardValues.push(categoryCards[((i - 1) % uniqueCards) + 1]);
    cardValues.push(categoryCards[((i - 1) % uniqueCards) + 1]);
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

      const cardFront = document.createElement("div");
      cardFront.className = "card-front";
      cardFront.innerText = cardValues[cardIndex++]; // Assign a random card value

      const cardBack = document.createElement("div");
      cardBack.className = "card-back";

      card.appendChild(cardFront);
      card.appendChild(cardBack);
      card.addEventListener("click", flipCard);

      rowElement.appendChild(card);
    }

    board.appendChild(rowElement);
  }
}

function flipCard() {
  // Flip card logic here
}

createBoard(gameRows, gameCols, selectedCategory);
