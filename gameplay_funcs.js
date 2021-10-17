////////////////////////////////////////////////
//Game Play functions
////////////////////////////////////////////////

//this is baseScore 9
//needs sortedHand
function isRoyal() {
  const allSameSuit = sortedHand.every((el) => el.suit === sortedHand[0].suit);
  const inSequence =
    sortedHand[0].rank === 1 &&
    sortedHand[1].rank === 10 &&
    sortedHand[2].rank === 11 &&
    sortedHand[3].rank === 12 &&
    sortedHand[4].rank === 13;
  return allSameSuit && inSequence; //if both true, shld return true
}

//this is baseScore 8
//needs sortedHand
//did not code for cases where Ace is part of straight flush
function isStraightFlush() {
  const allSameSuit = sortedHand.every((el) => el.suit === sortedHand[0].suit);
  const inSequence = sortedHand.every((el, index) => {
    index === sortedHand.length - 1 ||
      sortedHand[index + 1].rank - el.rank === 1;
  });

  return allSameSuit && inSequence; //if both true, shld return true
}

//this is baseScore 7
//needs sortedHand
function isFourOfAKind() {
  const equalFromFront =
    ((sortedHand[0] === sortedHand[1]) === sortedHand[2]) === sortedHand[3];
  const equalFromBack =
    ((sortedHand[1] === sortedHand[2]) === sortedHand[3]) === sortedHand[4];
  return equalFromFront || equalFromBack; //if either true, shld return true
}

//this is baseScore 6
//needs sortedHand
function isFullHouse() {
  const chkFrmFrontArr = sortedHand.filter(
    (el) => el.rank === sortedHand[0].rank
  );
  const chkFrmBckArr = sortedHand.filter(
    (el) => el.rank === sortedHand[sortedHand.length - 1].rank
  );
  const frontChk = chkFrmFrontArr.length === 2 && chkFrmBckArr.length === 3;
  const bckChk = chkFrmFrontArr.length === 3 && chkFrmBckArr.length === 2;

  return frontChk || bckChk; //if both true, shld return true
}

//this is baseScore 5
function isFlush() {
  const allSameSuit = sortedHand.every((el) => el.suit === sortedHand[0].suit);
  return allSameSuit;
}

//this is baseScore 4
//needs sortedHand
//did not code for cases where Ace is part of straight
function isStraight() {
  const inSequence = sortedHand.every((el, index) => {
    index === sortedHand.length - 1 ||
      sortedHand[index + 1].rank - el.rank === 1;
  });

  return inSequence;
}

//this is baseScore 3
//needs sortedHand
function isThreeOfAKind() {
  const chkFrmFrontArr = sortedHand.filter(
    (el) => el.rank === sortedHand[0].rank
  );
  const chkFrmBckArr = sortedHand.filter(
    (el) => el.rank === sortedHand[sortedHand.length - 1].rank
  );
  const chk = chkFrmFrontArr.length === 3 || chkFrmBckArr.length === 3;
  return chk;
}

//this is baseScore 2
//needs sortedHand
function isTwoPair() {
  let numMatches = 0;

  for (let i = 0; i < sortedHand.length - 1; i += 1) {
    sortedHand[i + 1].rank === sortedHand[i].rank
      ? (numMatches += 1)
      : numMatches;
  }

  const chk = numMatches === 2;
  return chk;
}

//this is baseScore 1
//needs sortedHand
//pair but must be jack or higher
function isJacksOrBetter() {
  let chk = false;
  let results = [];

  for (let i = 0; i < sortedHand.length - 1; i++) {
    if (sortedHand[i + 1].rank == sortedHand[i].rank) {
      results.push(sortedHand[i]);
    }
  }

  results.length > 0 && results[0].rank >= 11 ? (chk = true) : chk;
  return chk;
}

function calcHandScore() {
  let base = 0;
  if (isRoyal()) {
    base = 9;
  } else if (isStraightFlush()) {
    base = 8;
  } else if (isFourOfAKind()) {
    base = 7;
  } else if (isFullHouse()) {
    base = 6;
  } else if (isFlush()) {
    base = 5;
  } else if (isStraight()) {
    base = 4;
  } else if (isThreeOfAKind()) {
    base = 3;
  } else if (isTwoPair()) {
    base = 2;
  } else if (isJacksOrBetter()) {
    base = 1;
  } else {
    base = 0;
  }
  if (coinBet === 5 && base === 9) {
    credit += 4000;
  } else if (base >= 1) {
    let winnnings = payoutTable[base - 1].pay * coinBet;
    credit += winnnings;
    updateInfoBar("win", payoutTable[base - 1].hand);
    winAudio.play();
  } else {
    credit -= coinBet;
    updateInfoBar();
    loseAudio.play();
  }
  rounds += 1;
  // bet = 5;
  // credit = credit + multiplier * bet;
  // console.log(`Credit for round ${rounds} is ${credit}`);
}
