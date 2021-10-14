////////////////////////////////////////////////
//Game Helper functions
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

playDeck = shuffleCards(makeDeck());

//creating a card for display with information stored in card object
const createCard = (cardInfo) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const pic = document.createElement("img");
  pic.src = cardInfo.suitPic;
  card.append(pic);
  
  return card;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  textArea.innerHTML = message;
};

