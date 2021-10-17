////////////////////////////////////////////////
//Cards manipulation
////////////////////////////////////////////////
/**
 * A function that generates a deck of cards
 * @return {Array}   array created holding 52 objects that represent cards
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      const suitPicUrl = `images/cards/${rankCounter}_${currentSuit}.PNG`;
      let cardName = `${rankCounter}`;

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
        suitPic: suitPicUrl, //replace this w file name so can be appended to card as img url?
        selected: false,
      };

      // add the card to the deck
      newDeck.push(card); // add double the cards to the deck
      // newDeck.push(card);
    }
  }

  return newDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * A function to shuffle a deck of cards
 * @param  cards {Array} array containing objects that represent cards
 * @return {Array}   array of shuffled objects
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

function deal() {
  for (let i = 0; i < 5; i += 1) {
    userHand.push(playDeck.pop());
  }
}

function sort() {
  sortedHand = [];
  for (const el of userHand) {
    sortedHand.push(el);
  }
  sortedHand.sort((a, b) => a.rank - b.rank);
}

//create playDeck
playDeck = shuffleCards(makeDeck());

////////////////////////////////////////////////
//Display
////////////////////////////////////////////////

//initial cards display facing down
const initialCardsDisplay = () => {
  cardsDisplay.innerHTML = ""; //clear any cards tt may be displayed
  for (let i = 0; i < 5; i += 1) {
    const card = document.createElement("div");
    card.classList.add("card");
    const pic = document.createElement("img");
    pic.src = "images/cards/coverCard.PNG";
    card.append(pic);
    cardsDisplay.append(card);
  }
};

//creating a card for display with information stored in card object
const createCard = (cardInfo) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const pic = document.createElement("img");
  pic.src = cardInfo.suitPic;
  card.append(pic);

  return card;
};

function drawCardDisplay() {
  cardsDisplay.innerHTML = "";
  for (const el of userHand) {
    let card = createCard(el);
    cardsDisplay.append(card);
    card.addEventListener("click", () => {
      if (el.selected === false) {
        card.classList.add("opaque");
        el.selected = true;
        holdAudio.play();
      } else {
        card.classList.remove("opaque");
        el.selected = false;
        unholdAudio.play();
      }
    });
  }
  controlsDisplay.innerHTML = "";
  controlsDisplay.append(dealBtn);
  controlsDisplay.append(playBtn);
  controlsDisplay.append(helpBtn);
}

const createCoins = (coinInfo) => {
  const holder = document.createElement("div");
  holder.classList.add("holder");
  const pic = document.createElement("img");
  pic.src = coinInfo.image;
  holder.append(pic);

  return holder;
};

function drawCoinDisplay() {
  coinBar.innerHTML = "";
  coinBet = 0;
  for (const el of coinArr) {
    let coin = createCoins(el);
    coinBar.append(coin);
    coin.addEventListener("click", () => {
      let alrBet = 0;
      for (const el of coinArr) {
        el.selected === true ? (alrBet += 1) : alrBet;
      }

      if (alrBet === 0 || (alrBet === 1 && el.selected === true)) {
        if (el.selected === false) {
          coin.classList.add("opaque");
          el.selected = true;
          coinBet = el.value;
          holdAudio.play();
        } else {
          coin.classList.remove("opaque");
          el.selected = false;
          coinBet = 0;
          unholdAudio.play();
        }
      }
    });
  }
}

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

// startBtn.addEventListener("click", () => {
//   startAudio.play();
//   deal();
//   sort();
//   drawCardDisplay();
// });

dealBtn.addEventListener("click", () => {
  dealAudio.play();
  const temp = userHand.filter((el) => el.selected === false);
  userHand = temp;
  let cardsToReplace = 5 - userHand.length;

  for (let i = 0; i < cardsToReplace; i += 1) {
    userHand.push(playDeck.pop());
  }
  drawCardDisplay();
  dealBtn.classList.add("hide");
  sort();
});

playBtn.addEventListener("click", () => {
  if (coinBet === 0) {
    alert("Please choose a coin.");
  } else {
    calcHandScore();
    playBtn.classList.add("hide");
    dealBtn.classList.add("hide");
    controlsDisplay.append(replayBtn);
  }
});

replayBtn.addEventListener("click", () => {
  playArea.innerHTML = "";
  controlsDisplay.innerHTML = "";
  dealBtn.classList.remove("hide");
  playBtn.classList.remove("hide");
  userHand = [];
  sortedHand = [];
  for (const el of coinArr) {
    el.selected = false;
  }
  gameInit();
  deal();
  sort();
  drawCardDisplay();
});



//help button text
    // You start with 100 points.
    // Hit Start to receive your first five-card poker hand.
    // Discard cards you don’t want (up to all five can be discarded)
    // Hit Deal to receive replacement cards from the deck.
    // Any winnings will be displayed and added to your score according to the rank of hands. See Stakes
    // Hit Replay to continue the game.
    // The game ends when the deck runs out of cards.

