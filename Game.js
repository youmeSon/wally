'use strict';

class Game {

  constructor() {
    this.timeRemaining = 2;
    this.timerRunning = false;
    this.timer = null;
    this.image = this.getImage();
  }

  startGame() {
    document.querySelector('.overlay').style.display = 'none';
    this.onTimer();
  }

  onTimer() {
    this.updateTimeText(this.timeRemaining);
    this.timer = setInterval(() => {
      if(this.timeRemaining <= 0) {
        clearInterval(this.timer);
        return;
      } 
        this.updateTimeText(--this.timeRemaining);  
    }, 1000);
  }

  updateTimeText(time) {
    const minute = Math.floor(time / 60);
    const minuteString = this.processTime(minute);
    const second = time % 60;
    const secondString = this.processTime(second);
    document.querySelector('.timer').innerText = `${minuteString}:${secondString}`;
  }

  processTime(time) {
    return time < 10 ? "0" + time : time;
  }

  getImage() {
    axios.get('http://my-json-server.typicode.com/youmeSon/wally-data/images')
    .then(function (response) {
      return response.data[0]
    })
  }

}