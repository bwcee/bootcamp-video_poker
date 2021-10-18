////////////////////////////////////////////////
//Game Play functions
////////////////////////////////////////////////

/**
 * Function to test if userHand is a royal flush. If true, this is assigned a base number 9 so payout can be calculated. This function only works w sortedHand.
 * @returns {boolean} Bolean value
 */
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

/**
 *Function to test if userHand is a straight flush. If true, this is assigned a base number 8 so payout can be calculated. This function only works w sortedHand. Did not code for cases where Ace is part of straight flush, becos then it is not a straighforward sequence.
 * @returns {boolean} Bolean value
 */
function isStraightFlush() {
  const allSameSuit = sortedHand.every((el) => el.suit === sortedHand[0].suit);
  const inSequence = sortedHand.every((el, index) => {
    index === sortedHand.length - 1 ||
      sortedHand[index + 1].rank - el.rank === 1;
  });

  return allSameSuit && inSequence; //if both true, shld return true
}

/**
 *Function to test if userHand is 4 of a kind. If true, this is assigned a base number 7 so payout can be calculated. This function only works w sortedHand.
 * @returns {boolean} Bolean value
 */
function isFourOfAKind() {
  const equalFromFront =
    ((sortedHand[0] === sortedHand[1]) === sortedHand[2]) === sortedHand[3];
  const equalFromBack =
    ((sortedHand[1] === sortedHand[2]) === sortedHand[3]) === sortedHand[4];
  return equalFromFront || equalFromBack; //if either true, shld return true
}

/**
 *Function to test if userHand is fullhouse. If true, this is assigned a base number 6 so payout can be calculated. This function only works w sortedHand.
 * @returns {boolean} Bolean value
 */
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

/**
 *Function to test if userHand is flush. If true, this is assigned a base number 5 so payout can be calculated. Although does not require sortedHand to work, no harm using sortedHand.
 * @returns {boolean} Bolean value
 */
function isFlush() {
  const allSameSuit = sortedHand.every((el) => el.suit === sortedHand[0].suit);
  return allSameSuit;
}

/**
 *Function to test if userHand is a straight. If true, this is assigned a base number 4 so payout can be calculated. This function only works w sortedHand. Did not code for cases where Ace is part of straight flush, becos then it is not a straighforward sequence.
 * @returns {boolean} Bolean value
 */
function isStraight() {
  const inSequence = sortedHand.every((el, index) => {
    index === sortedHand.length - 1 ||
      sortedHand[index + 1].rank - el.rank === 1;
  });

  return inSequence;
}

/**
 *Function to test if userHand is 3 of a kind. If true, this is assigned a base number 3 so payout can be calculated. This function only works w sortedHand.
 * @returns {boolean} Bolean value
 */
function isThreeOfAKind() {
  let mf = 1;
  let m = 0;
  for (let i = 0; i < sortedHand.length; i += 1) {
    for (let j = 1; j < sortedHand.length; j += 1) {
      sortedHand[i].rank == sortedHand[j].rank ? (m += 1) : m;
      mf < m ? (mf = m) : mf;
    }
    m = 0;
  }
  return mf === 3;
}

/**
 *Function to test if userHand is two pairs. If true, this is assigned a base number 2 so payout can be calculated. This function only works w sortedHand.
 * @returns {boolean} Bolean value
 */
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

/**
 *Function to test if userHand is jacks or better. If true, this is assigned a base number 1 so payout can be calculated. This function only works w sortedHand.
 * @returns {boolean} Bolean value
 */
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

/**
 *Function that calls all 9 functions above to test if player has a winning combination. If yes, a base num is assigned so correct payout base can be obtained from global variable payoutTable and multiplied with the # of coins bet to arrive at the correct payout.
 */
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
}
