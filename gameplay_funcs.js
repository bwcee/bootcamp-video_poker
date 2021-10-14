////////////////////////////////////////////////
//Game Play functions
////////////////////////////////////////////////
function deal (){
  
}


function calcHandScore(hand) {
  let handSum = 0;
  for (const card of hand) {
    handSum = handSum + card.rank;
  }
}

