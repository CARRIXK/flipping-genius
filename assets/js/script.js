const cards = {
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

document.getElementById('game-controls-viewer').addEventListener('click', () => {
    const gameControls = document.getElementById('game-controls');
    if (gameControls.style.height === '0px' || gameControls.style.height === '') {
        gameControls.style.height = `${gameControls.scrollHeight + 17}px`;
    } else {
        gameControls.style.height = '0px';
    }
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
      card.style.transform = "translateY(100vh) rotateX(90deg)";
      card.dataset.id = cardValues[cardIndex].id;

      const cardFront = document.createElement("div");
      cardFront.className = "card-front";
      cardFront.style.backgroundImage = `url(${cardValues[cardIndex].url})`;

      const cardBack = document.createElement("div");
      cardBack.className = "card-back";

      card.appendChild(cardFront);
      card.appendChild(cardBack);
      card.addEventListener("click", flipCard);

      rowElement.appendChild(card);
      cardIndex++;
    }

    board.appendChild(rowElement);
  }

  // Add the deal class to each card one at a time
  const unDealtCards = board.querySelectorAll(".game-card");
  unDealtCards.forEach((card, index) => {
      setTimeout(() => {
          card.classList.add("deal");
          card.addEventListener("animationend", () => {
            card.style.transform = "";
            card.classList.remove("deal");
          });
      }, index * 100); // Adjust the delay as needed
  });
}



/**
 * Handles the logic for flipping a card in a card matching game.
 * 
 * @param {Event} e - The event object triggered by clicking a card.
 * 
 * The function performs the following steps:
 * 1. Retrieves the clicked card and currently flipped cards.
 * 2. Prevents flipping more than two cards at a time.
 * 3. Flips the clicked card and updates the list of flipped cards.
 * 4. If two cards are flipped, checks if they match:
 *    - If they match, increases the match count and marks the cards as matched.
 *    - If they do not match, flips the cards back after a delay.
 */
function flipCard(e) {
    // Flip card logic here
    let card = e.currentTarget;

    //Currently flipped cards
    let flippedCards = document.querySelectorAll(".flipped");

    // console.log("Number of flipped cards" , flippedCards.length)
    //Prevent flipping more than two cards
    if(flippedCards.length >= 2) return;

    // Flip the clicked card
    card.classList.add("flipped");

    // Update flipped cards after flipping the new one
    flippedCards = document.querySelectorAll(".flipped");

    //Only check when two cards are flipped
    if(flippedCards.length === 2){

        let firstCard = flippedCards[0];
        let secondCard = flippedCards[1];
        
        if(firstCard.dataset.id === secondCard.dataset.id){
            console.log("There is a match");
            //increase the match count
            increaseMatchCount();
            //for each of the flipped cards add the matched class
            setTimeout(() => {
                flippedCards.forEach(card => card.classList.replace("flipped", "matched")); 
            }, 800 ); 

        }else{
            console.log("No match");
            //wait 0.8 seconds then remove the flipped class from each card
            setTimeout(() => {
                flippedCards.forEach(card => card.classList.toggle("flipped"));
            }, 800 ); 

            console.log("cards class list", card.classList);
        }
    }else{
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

// Create the initial board
createBoard(gameRows, gameCols, selectedCategory);
