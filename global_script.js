////////////////////////////////////////////////
//Global Variables
////////////////////////////////////////////////

let gameStage = 0;

let playDeck = [];

let credit = 100;
let coinBet = 0;

let userHand = [];
let sortedHand = [];

const payoutTable = [
  { hand: "Jacks or Better", pay: 1 },
  { hand: "2 Pairs", pay: 2 },
  { hand: "3 of a Kind", pay: 3 },
  { hand: "Straight", pay: 4 },
  { hand: "Flush", pay: 6 },
  { hand: "Full House", pay: 9 },
  { hand: "4 of a Kind", pay: 25 },
  { hand: "Straight Flush", pay: 50 },
  { hand: "Royal Flush", pay: 250 },
];

let coinArr = [
  { value: 1, image: "images/OneChip.png", selected: false },
  { value: 2, image: "images/TwoChip.png", selected: false },
  { value: 3, image: "images/ThreeChip.png", selected: false },
  { value: 4, image: "images/FourChip.png", selected: false },
  { value: 5, image: "images/FiveChip.png", selected: false },
];

let tableColHighlight = [
  "one_coin",
  "two_coin",
  "three_coin",
  "four_coin",
  "five_coin",
];

//UI

//div to contain starting screen
const startDisp = document.createElement("div");
startDisp.classList.add("start_display");

//div to contain entire display
const wholeDisp = document.createElement("div");
wholeDisp.classList.add("whole_display");

//div to contain entire play area
const playArea = document.createElement("div");
playArea.classList.add("play_area");

//div to show credits
const infoBar = document.createElement("div");
infoBar.classList.add("info_bar");

//div to show coins
const coinBar = document.createElement("div");
coinBar.classList.add("coin_bar");

//div to show cards
const cardsDisplay = document.createElement("div");
cardsDisplay.classList.add("cards_display");

//controls area div
const controlsDisplay = document.createElement("div");
controlsDisplay.classList.add("controls_display");

//help text div
const helpDisplay = document.createElement("div");
helpDisplay.classList.add("help_display");

//curtain div to cover the whole screen
const curtain = document.createElement("div");
curtain.classList.add("curtain");

//hook div for hook pic
const hookDisp = document.createElement("div");
hookDisp.classList.add("hook_display");

//deal button
const dealBtn = document.createElement("button");
dealBtn.classList.add("deal_button");
dealBtn.innerText = "Deal";

//play button
const playBtn = document.createElement("button");
playBtn.classList.add("play_button");
playBtn.innerText = "Play";

//replay button
const replayBtn = document.createElement("button");
replayBtn.classList.add("replay_button");
replayBtn.innerText = "Replay";

// help button
const helpBtn = document.createElement("button");
helpBtn.classList.add("help_button");
helpBtn.innerText = "?";

// close help button
const closeHelpBtn = document.createElement("button");
closeHelpBtn.classList.add("close_help_button");
closeHelpBtn.innerText = "Got it!";

// close game button
const closeGameBtn = document.createElement("button");
closeGameBtn.classList.add("close_game_button");
closeGameBtn.innerText = "X";

//Audio
const startAudio = document.getElementById("start_audio");
const holdAudio = document.getElementById("hold_audio");
const unholdAudio = document.getElementById("unhold_audio");
const dealAudio = document.getElementById("deal_audio");
const loseAudio = document.getElementById("lose_audio");
const winAudio = document.getElementById("win_audio");

//Test userHands
// 3 of a Kind
/* userHand = [
      {
        name: "3",
        suit: "hearts",
        rank: 3,
        suitPic: "images/cards/3_hearts.PNG",
        selected: false,
      },
      {
        name: "5",
        suit: "hearts",
        rank: 5,
        suitPic: "images/cards/5_hearts.PNG",
        selected: false,
      },
      {
        name: "5",
        suit: "spades",
        rank: 5,
        suitPic: "images/cards/5_spades.PNG",
        selected: false,
      },
      {
        name: "5",
        suit: "clubs",
        rank: 5,
        suitPic: "images/cards/5_clubs.PNG",
        selected: false,
      },
      {
        name: "jack",
        suit: "spades",
        rank: 11,
        suitPic: "images/cards/11_spades.PNG",
        selected: false,
      },] */

/* userHand = [
  {
    name: "5",
    suit: "hearts",
    rank: 5,
    suitPic: "images/cards/5_hearts.PNG",
    selected: false,
  },
  {
    name: "5",
    suit: "spades",
    rank: 5,
    suitPic: "images/cards/5_spades.PNG",
    selected: false,
  },
  {
    name: "5",
    suit: "diamonds",
    rank: 5,
    suitPic: "images/cards/5_diamonds.PNG",
    selected: false,
  },
  {
    name: "6",
    suit: "diamonds",
    rank: 6,
    suitPic: "images/cards/6_diamonds.PNG",
    selected: false,
  },
  {
    name: "10",
    suit: "hearts",
    rank: 10,
    suitPic: "images/cards/10_hearts.PNG",
    selected: false,
  },
]; */
