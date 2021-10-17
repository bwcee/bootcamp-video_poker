////////////////////////////////////////////////
//Game Initialisation
////////////////////////////////////////////////

(() => {
  document.body.append(startDisp);
  const pic = document.createElement("img");
  pic.src = "images/door.png";
  startDisp.append(pic);

  const textDiv = document.createElement("div");
  startDisp.append(textDiv);
  textDiv.innerHTML =
    "<h3>Click on this door to start your journey to untold riches!!</h3>";

  textDiv.addEventListener("click", () => {
    startDisp.remove();
    deal();
    sort();
    gameInit();
    drawCardDisplay();
  });
})();

function gameInit() {
  document.body.append(wholeDisp);
  wholeDisp.append(infoBar);
  infoBar.innerHTML = `<h3>credits:${credit}</h3>`;
  wholeDisp.append(coinBar);
  drawCoinDisplay();
  wholeDisp.append(playArea);
  playArea.append(cardsDisplay);

  initialCardsDisplay();

  wholeDisp.append(controlsDisplay);
}
