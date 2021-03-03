'use strict';
const startBtn = document.querySelector('.start__box');
let replayBtn = document.querySelector('.replay')
let nextBtn = document.querySelector('.next');
let stage = 0;

axios.get('https://my-json-server.typicode.com/youmeSon/wally-data/images')
    .then(function (response) {
      
      let newGame = new Game(response.data[stage]);
    
      startBtn.addEventListener('click', () => {
        newGame.startGame(response.data[stage]);
      });

      replayBtn.addEventListener('click', () => {
        newGame.resetGame();
      })
      
      nextBtn.addEventListener('click', ()=> {
        console.log(stage);
        if(stage < response.data.length - 1) {
          stage++;
          newGame.startGame(response.data[stage]);
        } else {
          newGame.theEnd();
        }
      })        
    })

