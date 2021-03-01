'use strict';

class Game {

  constructor(image) {
    this.timeRemaining = 180;
    this.timerRunning = false;
    this.timer = null;
    this.image = image;
  }

  startGame() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('#background-img').src = `img/${this.image.name}`;
    this.onTimer();
    this.tickingSound();
    this.findingWally(this.image);
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

  tickingSound() {
    const clockTicking = new Audio('sound/clock-ticking.mp3');
    clockTicking.loop = true;
    if(clockTicking) {
      clockTicking.play();
    };
  };

  findingWally(image) {
    document.addEventListener('click', function(e) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const x = e.pageX / screenWidth;
      const y = e.pageY / screenHeight;
      const wally = document.querySelector('.big-wally');
      const tryAgain = document.querySelector('.try-again');


        if(wally.classList.contains('active')) {
          location.reload();
        } else if(Math.abs(x - image.xCoordinate) < 0.003 && Math.abs(y - image.yCoordinate) < 0.04) {
          wally.classList.add('active');
        } else if(!(e.target.classList.contains("start__game") || e.target.classList.contains("start__box"))) {
          tryAgain.classList.add('active');
        }

        if(e.target.classList.contains('try-again')) {
          tryAgain.classList.remove('active');
        }
      
  
    })
  }
}
