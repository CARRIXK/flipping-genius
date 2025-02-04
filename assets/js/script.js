const cards = {
  animals: {
    1: img URL"assets/ant.png",
    2: "assets/images"assets/images/cat.png,
    3: "🐭assets/images/mouse.png",
    4: "assets/images/dog.png",
    5: "assets/images/rabbit.png",
    6: "assets/images/fox.png",
    7: "assets/images/lion/png",
    8: "assets/images/horse.png",
  },
  fruits: {
    1: "🍎assets/images/apple.jpeg",
    2: "assets/images/banana,jpeg",
    3: "assets/images/pear.jpeg",
    4: "assets/images/watermelon.jpeg",
    5: "assets/images/strawberry.jpeg",
    6: "assets/images/cherry.jpeg",
    7: "assets/images/peach.jpeg",
    8: "assets/images/pineapple.jpeg",
  },
  colours: {
    1: "assets/images/red.jpeg",
    2: "assets/images/blue.jpeg",
    3: "assets/images/green.jpeg",
    4: "assets/images/yellow.jpeg",
    5: "assets/images/purple.jpeg",
    6: "assets/images/orange.jpeg",
    7: "assets/images/pink.jpeg",
    8: "assets/images/brown.jpeg",
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
