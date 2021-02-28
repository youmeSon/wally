'use strict';

let newGame = new Game();

const startBtn = document.querySelector('.start__box');
startBtn.addEventListener('click', () => {
  newGame.startGame();
});
