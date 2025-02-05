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
      url: "assets/images/dog.png",
    },
    {
      id: 4,
      url: "assets/images/mouse.png",
    },
    {
      id: 5,
      url: "assets/images/rabbit.png",
    },
    {
      id: 6,
      url: "assets/images/cowpng.png",
    },
    {
      id: 7,
      url: "assets/images/elephant.png",
    },
    {
      id: 8,
      url: "assets/images/horse.png",
    },
  ],
  fruits: [
    {
      id: 1,
      url: "assets/images/apple.jpeg",
    },
    {
      id: 2,
      url: "assets/images/banana.jpeg",
    },
    {
      id: 3,
      url: "assets/images/grapes.jpeg",
    },
    {
      id: 4,
      url: "assets/images/lemon.jpeg",
    },
    {
      id: 5,
      url: "assets/images/orange.jpeg",
    },
    {
      id: 6,
      url: "assets/images/peach.jpeg",
    },
    {
      id: 7,
      url: "assets/images/pear.jpeg",
    },
    {
      id: 8,
      url: "assets/images/strawberry.jpeg",
    },
    {
      id: 9,
      url: "assets/images/avacado.jpeg",
    },
    {
      id: 10,
      url: "assets/images/cherry.jpeg",
    },
    {
      id: 11,
      url: "assets/images/coconut.jpeg",
    },
    {
      id: 12,
      url: "assets/images/grapefruit.jpeg",
    },
    {
      id: 13,
      url: "assets/images/kiwi.jpeg",
    },
    {
      id: 14,
      url: "assets/images/lime.jpeg",
    },
    {
      id: 15,
      url: "assets/images/mango.jpeg",
    },
    {
      id: 16,
      url: "assets/images/melon.jpeg",
    },
    {
      id: 17,
      url: "assets/images/papaya.jpeg",
    },
    {
      id: 18,
      url: "assets/images/pineapple.jpeg",
    },
    {
      id: 19,
      url: "assets/images/plum.jpeg",
    },
    {
      id: 20,
      url: "assets/images/pomegranate.jpeg",
    },
    {
      id: 21,
      url: "assets/images/raspberry.jpeg",
    },
    {
      id: 22,
      url: "assets/images/watermelon.jpeg",
    },
  ],
  colours: [
    {
      id: 1,
      url: "assets/images/blue.jpeg",
    },
    {
      id: 2,
      url: "assets/images/green.jpeg",
    },
    {
      id: 3,
      url: "assets/images/orange.jpeg",
    },
    {
      id: 4,
      url: "assets/images/black.jpg",
    },
    {
      id: 5,
      url: "assets/images/brown.jpeg",
    },
    {
      id: 6,
      url: "assets/images/grey.jpeg",
    },
    {
      id: 7,
      url: "assets/images/lilac.jpeg",
    },
    {
      id: 8,
      url: "assets/images/navy.jpeg",
    },
    {
      id: 9,
      url: "assets/images/pink.jpeg",
    },
    {
      id: 10,
      url: "assets/images/purple.jpeg",
    },
    {
      id: 11,
      url: "assets/images/red.jpeg",
    },
    {
      id: 12,
      url: "assets/images/sky-blue.jpeg",
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
  // reset the attempts count
  document.getElementById("attemptCount").innerText = 0;
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
          //card.removeChild(card.lastChild);
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

function completeGame() {
  stopTimer();
  const finalTime = document.querySelector("#game-timer span").textContent;
  const attempts = parseInt(document.getElementById("attemptCount").innerText);
  const difficulty = document.getElementById("difficulty-setting").value;

  // Save the score to localStorage
  saveScore(difficulty, finalTime, attempts);

  // Show the congratulations modal
  const congratsModal = new bootstrap.Modal(document.getElementById('congratsModal'));
  document.getElementById('final-time').textContent = finalTime;
  congratsModal.show();
}

function saveScore(difficulty, time, attempts) {
  const currentScore = { time, attempts, date: Date.now() };
  const savedScore = JSON.parse(localStorage.getItem(difficulty));

  if (savedScore) {
    const savedTime = savedScore.time.split(':').map(Number);
    const currentTime = time.split(':').map(Number);

    const savedScoreValue = savedTime[0] * 3600 + savedTime[1] * 60 + savedTime[2] + savedScore.attempts;
    const currentScoreValue = currentTime[0] * 3600 + currentTime[1] * 60 + currentTime[2] + attempts;

    if (currentScoreValue < savedScoreValue) {
      localStorage.setItem(difficulty, JSON.stringify(currentScore));
      notifyNewHighScore();
    } else {

      const existingHighScoreMessage = document.querySelector('.high_score');
      if (existingHighScoreMessage) {
        document.removeChild(existingHighScoreMessage);
      }
    }
  } else {
    localStorage.setItem(difficulty, JSON.stringify(currentScore));
    notifyNewHighScore();
  }

  populateHighScores()

  // Set expiration for 3 months
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 3);
  localStorage.setItem(`${difficulty}_expiration`, expirationDate.getTime());
}

function notifyNewHighScore() {
  const congratsModalBody = document.querySelector('#congratsModal .modal-body');
  const newHighScoreMessage = document.createElement('p');
  newHighScoreMessage.textContent = 'New High Score!';
  newHighScoreMessage.classList.add('high_score');
  congratsModalBody.appendChild(newHighScoreMessage);
}

function populateHighScores() {
  const difficulties = ['easy', 'medium', 'hard'];
  const highScoresList = document.getElementById('high-scores-list');
  highScoresList.innerHTML = '';

  difficulties.forEach(difficulty => {
    const savedScore = JSON.parse(localStorage.getItem(difficulty));
    if (savedScore) {
      const expiration = localStorage.getItem(`${difficulty}_expiration`);
      if (Date.now() > expiration) {
        localStorage.removeItem(difficulty);
        localStorage.removeItem(`${difficulty}_expiration`);
      } else {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}: Time - ${savedScore.time}, Attempts - ${savedScore.attempts}`;
        highScoresList.appendChild(listItem);
      }
    }
  });
}

function increaseCount(elementId) {
  let newCount = parseInt(document.getElementById(elementId).innerText) + 1;
  document.getElementById(elementId).innerText = newCount;

  // Check if all cards have been matched
  if (elementId == 'matchCount' && newCount === (gameRows * gameCols) / 2) {
    completeGame();
  }
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

document.addEventListener('DOMContentLoaded', () => {
  // Populate the category dropdown on page load
  populateCategoryDropdown();
  // Create the initial board
  createBoard(gameRows, gameCols, selectedCategory);
  // Check for any previous high scores and populate the leaderboard
  populateHighScores();
});

// audio files
const ShuffleSound = new Audio('assets/sounds/cardshuffle.mp3');
const flipSound = new Audio('assets/sounds/flipcard.mp3');
const matchSound = new Audio('assets/sounds/matchcard.mp3');
const winSound = new Audio('assets/sounds/levelwin.mp3');
const gameOverSound = new Audio('assets/sounds/gameover.mp3');

function playShuffleSound() {    
    ShuffleSound.play();
}
function playFlipSound() {
  flipSound.play();
}

function playMatchSound() {
  matchSound.play();
}

function playwinSound() {
    winSound.play();
}

function playGameOverSound() {
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