'use strict';
const startBtn = document.querySelector('.start__box');
const nextBtn = document.querySelector('.replay');
let stage = 0;

axios.get('http://my-json-server.typicode.com/youmeSon/wally-data/images')
    .then(function (response) {
      
      let newGame = new Game(response.data[stage]);
    
      startBtn.addEventListener('click', () => {
        newGame.startGame(response.data[stage]);
      });

      nextBtn.addEventListener('click', () => {
        stage++;
        console.log('youme');
        newGame.startGame(response.data[stage]);
        nextBtn();
      })
});
