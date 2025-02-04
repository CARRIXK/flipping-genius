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
  colours: [
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
let selectedCategory = Object.keys(cards)[0];
let timerInterval;
let startTime;
let isTimerRunning = false;

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

document.getElementById("category-setting").addEventListener("change", (event) => {
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

  // reset the match count
  document.getElementById("matchCount").innerText = 0;
  // Reset the timer
  resetTimer();

  // Apply remove animation to existing cards
  const existingCards = board.querySelectorAll(".game-card");
  existingCards.forEach((card, index) => {
    card.style.transform = 'translateY(0) rotateX(0)'; // Set initial state
    card.style.zIndex = 1; // Ensure the card is above the new cards
    card.classList.add("removing");
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Wait for the remove animation to finish before clearing the board and adding new cards
  setTimeout(() => {
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
  }, existingCards.length * 100); // Adjust the timeout based on the number of existing cards
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

    let card = e.currentTarget;

  // Start the timer if it's not already running
  if (!isTimerRunning) {
    startTimer();
  }

  //Currently flipped cards
  let flippedCards = document.querySelectorAll(".flipped");

    //Prevent flipping more than two cards
    if (flippedCards.length >= 2) return;

  // Flip the clicked card
  card.classList.add("flipped");

  // Update flipped cards after flipping the new one
  flippedCards = document.querySelectorAll(".flipped");

    //Only check when two cards are flipped
    if (flippedCards.length === 2) {

        increaseCount("attemptCount");

        let firstCard = flippedCards[0];
        let secondCard = flippedCards[1];

        if (firstCard.dataset.id === secondCard.dataset.id) {
            console.log("There is a match");
            //increase the match count
            increaseCount("matchCount");
            //for each of the flipped cards add the matched class
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.replace("flipped", "matched");
                    card.removeChild(card.lastChild);
                    console.log(card);

                });
            }, 800);

        } else {
            console.log("No match");
            //wait 0.8 seconds then remove the flipped class from each card
            setTimeout(() => {
                flippedCards.forEach(card => card.classList.toggle("flipped"));
            }, 800);
        }
    } else {
        console.log(`Only ${flippedCards.length} card has been flipped`);
    }
}

function increaseMatchCount() {
  let newCount = parseInt(document.getElementById("matchCount").innerText) + 1;
  document.getElementById("matchCount").innerText = newCount;

  // Check if all cards have been matched
  if (newCount === (gameRows * gameCols) / 2) {
    completeGame();
  }
}

function completeGame() {
  stopTimer();
  // Show the congratulations modal
  const congratsModal = new bootstrap.Modal(document.getElementById('congratsModal'));
  document.getElementById('final-time').textContent = document.querySelector("#game-timer span").textContent;
  congratsModal.show();
}

function increaseCount(elementId){
    let newCount = parseInt(document.getElementById(elementId).innerText) + 1;
    document.getElementById(elementId).innerText = newCount;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  isTimerRunning = true;
}

function stopTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
}

function resetTimer() {
  stopTimer();
  document.querySelector("#game-timer span").textContent = "00:00";
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

  document.querySelector("#game-timer span").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Populate the category dropdown on page load
populateCategoryDropdown();

// Create the initial board
createBoard(gameRows, gameCols, selectedCategory);
