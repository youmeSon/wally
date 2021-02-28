'use strict';
const startBtn = document.querySelector('.start__box');

axios.get('http://my-json-server.typicode.com/youmeSon/wally-data/images')
    .then(function (response) {

      let image =  response.data[0];

      let newGame = new Game(image);

      startBtn.addEventListener('click', () => {
        newGame.startGame();
      });

});
