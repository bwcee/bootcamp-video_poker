////////////////////////////////////////////////
//Game Initialisation
////////////////////////////////////////////////
function test() {
  const trialDeck = makeDeck();
  for (const el of trialDeck) {
    document.body.append(createCard(el));
  }
}

test();
