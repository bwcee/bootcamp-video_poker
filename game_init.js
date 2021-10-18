////////////////////////////////////////////////
//Game Initialisation
////////////////////////////////////////////////
/**
 * IIFE to kickstart game initial display. Sets up the help and close game button on the top right with their respective addEventListeners. 
 */
(() => {
  // draw elements to show for this start screen
  document.body.append(helpBtn);
  document.body.append(closeGameBtn);
  document.body.append(startDisp);
  const pic = document.createElement("img");
  pic.src = "images/door.png";
  startDisp.append(pic);

  const textDiv = document.createElement("div");
  startDisp.append(textDiv);
  textDiv.innerHTML =
    "<h3>Click on this door to start your journey to untold riches!!</h3>";

  // functionality/interactivity for the various elements on the start screen
  // click on door to start the game
  textDiv.addEventListener("click", () => {
    startDisp.remove();
    playDeck = shuffleCards(makeDeck());
    deal();
    sort();
    gameInit();
  });

  // click on X to black out screen to "exit" game
  closeGameBtn.addEventListener("click", () => {
    document.body.append(curtain);

    curtain.append(hookDisp);
    const hookPic = document.createElement("img");
    hookDisp.append(hookPic);
    hookPic.src = "images/hook.png";

    const hookTextDiv = document.createElement("div");
    hookDisp.append(hookTextDiv);
    hookTextDiv.innerHTML = "<h3>Noooooooo! Dun leave! Come back!</h3>";

    hookTextDiv.addEventListener("click", () => {
      curtain.remove();
      startDisp.remove();
      curtain.innerHTML = "";
      hookDisp.innerHTML = "";
      hookTextDiv.innerHTML = "";

      replay();
    });
  });

  // click on help to display help text
  helpBtn.addEventListener("click", () => {
    document.body.append(helpDisplay);
    helpDisplay.innerHTML =
      "<ol><li>You start with 100 credits</li><li>Choose coin above cards to select number of coins to play.</li><li>Hit <strong>Deal</strong> to reveal hand.</li><li>Select cards to discard. Hit <strong>Deal</strong> again to discard and receive replacement cards.</li><li>You can only swap cards once per hand. Hitting <strong>Deal</strong> without selecting cards also counts as swapping cards.</li><li>Hit <strong>Play</strong> to see results.</li><li>Hit <strong>Replay</strong> to continue playing.</li><li>This is Hotel California. You can NEVER LEAVE! Just kidding... hit <strong>X</strong> at the top right to get out of dodge...</li></ol>";
    helpDisplay.append(closeHelpBtn);
    closeHelpBtn.addEventListener("click", () => {
      helpDisplay.remove();
    });
  });
})();

/**
 * Function to set up display for actual game play. 
 */
function gameInit() {
  // clear all the  containing divs
  wholeDisp.innerHTML = "";
  playArea.innerHTML = "";
  infoBar.innerHTML = "";
  coinBar.innerHTML = "";
  cardsDisplay.innerHTML = "";
  controlsDisplay.innerHTML = "";

  // populate screen for playing
  document.body.append(wholeDisp);

  wholeDisp.append(infoBar);
  infoBar.innerHTML = `<h3>credits:${credit}</h3>`;

  wholeDisp.append(coinBar);
  drawCoinDisplay();

  wholeDisp.append(playArea);

  playArea.append(cardsDisplay);
  cardsDown();

  wholeDisp.append(controlsDisplay);
}
