////////////////////////////////////////////////
//Cards manipulation
////////////////////////////////////////////////

/**
 * Function to create deck of cards
 * @returns {Array} An array of 52 card objects
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      const suitPicUrl = `images/cards/${rankCounter}_${currentSuit}.PNG`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
      } else if (cardName === "11") {
        cardName = "jack";
      } else if (cardName === "12") {
        cardName = "queen";
      } else if (cardName === "13") {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitPic: suitPicUrl,
        selected: false, //needed for card select effect
      };
      newDeck.push(card);
    }
  }
  return newDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Function to shuffle an array of card objects
 * @param  {Array} cards An array of card objects
 * @returns  {Array} The same array with the card objects' positions shuffled
 */
const shuffleCards = (cards) => {
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};

/**
 * A function to create a HTML div to display a single card image
 * @param  {object} cardInfo
 * @returns  {HTMLElement} A HTML div
 */
const createCard = (cardInfo) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const pic = document.createElement("img");
  pic.src = cardInfo.suitPic;
  card.append(pic);

  return card;
};
/**
 * Function to deal player cards and store them in global variable userHand.
 */
function deal() {
  for (let i = 0; i < 5; i += 1) {
    userHand.push(playDeck.pop());
  }
}
/**
 * Function to sort card objects in userHand by rank and store them in a global variable sortedHand
 */
function sort() {
  sortedHand = [];
  for (const el of userHand) {
    sortedHand.push(el);
  }
  sortedHand.sort((a, b) => a.rank - b.rank);
}

////////////////////////////////////////////////
//Display
////////////////////////////////////////////////

//initial cards display facing down

/**
 * Function to create display of faced down cards on screen. Also append dealBtn on screen for player to click to turn over the cards.
 */
const cardsDown = () => {
  cardsDisplay.innerHTML = ""; //clear any cards tt may be displayed
  for (let i = 0; i < 5; i += 1) {
    const card = document.createElement("div");
    card.classList.add("card");
    const pic = document.createElement("img");
    pic.src = "images/cards/coverCard.PNG";
    card.append(pic);
    cardsDisplay.append(card);
  }
  controlsDisplay.innerHTML = "";
  controlsDisplay.append(dealBtn);
};
/**
 * Function to create display of cards facing up. Each card is created with an addEventListener. playBtn also appended at controlDisplay for player to play hand.
 */
function cardsUp() {
  cardsDisplay.innerHTML = "";
  for (const el of userHand) {
    let card = createCard(el);
    cardsDisplay.append(card);
    card.addEventListener("click", () => {
      if (gameStage <= 1) {
        if (el.selected === false) {
          card.classList.add("opaque");
          el.selected = true;
          holdAudio.play();
        } else {
          card.classList.remove("opaque");
          el.selected = false;
          unholdAudio.play();
        }
      }
    });
  }
  controlsDisplay.append(playBtn);
}

/**
 * Similar to createCard, a function to create a HTML div to display a single coin.
 * @param  {object} coinInfo
 * @returns  {HTMLElement} A HTML div
 */
const createCoins = (coinInfo) => {
  const holder = document.createElement("div");
  holder.classList.add("holder");
  const pic = document.createElement("img");
  pic.src = coinInfo.image;
  holder.append(pic);

  return holder;
};

/**
 Function to draw coins at coinBar div. starts with setting global variable coinBet to 0 as no coin has been selected as a bet. Each coin is created with an addEventListener for UI functionality. 
 */
function drawCoinDisplay() {
  coinBar.innerHTML = "";
  coinBet = 0;
  for (const el of coinArr) {
    let coin = createCoins(el);
    coinBar.append(coin);
    coin.addEventListener("click", () => {
      if (gameStage === 0) {
        let alrBet = 0;
        for (const el of coinArr) {
          el.selected === true ? (alrBet += 1) : alrBet;
        }

        if (alrBet === 0 || (alrBet === 1 && el.selected === true)) {
          if (el.selected === false) {
            coin.classList.add("opaque");
            el.selected = true;
            coinBet = el.value;
            document
              .getElementById(tableColHighlight[coinBet - 1])
              .classList.add("change_bckgrd");
            holdAudio.play();
          } else {
            coin.classList.remove("opaque");
            document
              .getElementById(tableColHighlight[coinBet - 1])
              .classList.remove("change_bckgrd");
            el.selected = false;
            coinBet = 0;
            unholdAudio.play();
          }
        }
      }
    });
  }
}

/**
 *  Function to update the infoBar text on player's credit and
 * @param  {string} status argument passed when function cCalled from calcHandScore
 * @param  {string} hand argument also passed when function cCalled from calcHandScore. It is the  hand property value of an object in the payoutTable array
 */
function updateInfoBar(status, hand) {
  if (status === "win") {
    infoBar.innerHTML = `<h3>You won with ${hand}!       credits:${credit}</h3>`;
  } else {
    infoBar.innerHTML = `<h3>credits:${credit}</h3>`;
  }
}

////////////////////////////////////////////////
//Buttons
////////////////////////////////////////////////

dealBtn.addEventListener("click", () => {
  if (coinBet === 0) {
    alert("Please choose number of coins to play.");
  } else if (gameStage === 0) {
    cardsUp();
    gameStage += 1;
  } else {
    dealAudio.play();
    const temp = userHand.filter((el) => el.selected === false);
    userHand = temp;
    let cardsToReplace = 5 - userHand.length;

    for (let i = 0; i < cardsToReplace; i += 1) {
      userHand.push(playDeck.pop());
    }
    cardsUp();
    dealBtn.classList.add("hide");
    sort();
    gameStage += 1;
  }
});

playBtn.addEventListener("click", () => {
  const temp = userHand.filter((el) => el.selected === true);
  if (temp.length > 0) {
    alert(
      "You have selected cards for swapping. Hit Deal to complete swap or unselect cards to play this hand."
    );
  } else {
    calcHandScore();
    playBtn.classList.add("hide");
    dealBtn.classList.add("hide");
    controlsDisplay.append(replayBtn);
  }
});

replayBtn.addEventListener("click", () => {
  replay();
});

/**
 * Function to contain all the actions that must be taken replay. Relevant global variables are reset. All display none removed. New deck of cards created to be shuffled and dealt to player.
 */
function replay() {
  dealBtn.classList.remove("hide");
  playBtn.classList.remove("hide");

  userHand = [];
  sortedHand = [];
  gameStage = 0;
  for (const el of coinArr) {
    el.selected = false;
  }
  playDeck = shuffleCards(makeDeck());
  deal();
  sort();
  gameInit();
}
