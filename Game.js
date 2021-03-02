'use strict';

class Game {

  constructor(image) {
    this._timeRemaining = 10;
    this._timerRunning = false;
    this._timer = null;
    this._image = image;
    this._clockTicking = null;
    this._popUp = null;
    this._popUpText = null;
    this._playBtn = null;
  }

  get timeRemaining() {
    return this._timeRemaining;
  }

  get timerRunning() {
    return this._timerRunning;
  }

  get timer() {
    return this._timer;
  }

  set timer(value) {
    this._timer = value;
  }

  get image() {
    return this._image;
  }

  get clockTicking() {
    return this._clockTicking;
  }

  get popUp() {
    return this._popUp;
  }

  get popUpText() {
    return this._popUpText;
  }
  get playBtn() {
    return this._playBtn;
  }

  startGame() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('#background-img').src = `img/${this._image.name}`;
    this.startTimer();
    this.tickingSound();
    this.findingWally(this._image);
  }

  startTimer() {
    this.updateTimeText(this._timeRemaining);
    this._timer = setInterval(() => {
      if(this._timeRemaining <= 0) {
        clearInterval(this._timer);
        this.gameOver("You Lost!");
        return;
      } 
        this.updateTimeText(--this._timeRemaining);  
    }, 1000); 
  }

  stopTimer() {
    document.querySelector('.timer').innerText = '00:00';
    clearInterval(this._timer);
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
    this._clockTicking = new Audio('sound/clock-ticking.mp3');
    this._clockTicking.loop = true;
    this._clockTicking.play();
    
  };

  findingWally(image) {
    document.addEventListener('click', e => {
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
          this.nextStage("Next Stage? 🎉")
          this.stopTimer();
        } else if(!(e.target.classList.contains("start__game") || e.target.classList.contains("start__box") ||  e.target.classList.contains("fa-undo") ||e.target.classList.contains("replay"))) {
          tryAgain.classList.add('active');
        }

        if(e.target.classList.contains('try-again')) {
          tryAgain.classList.remove('active');
        }
    })
  } 
  
  gameOver(text) {
    this._popUp = document.querySelector('.pop-up');
    this._popUpText = document.querySelector('.pop-up__text');
    const alertSound = new Audio('sound/alert.wav');
    this._clockTicking.pause();
    alertSound.play();
    this._popUp.style.visibility = 'visible';
    this._popUpText.innerText = text;
    this.replay();
  }

  nextStage(text) {
    this._popUp = document.querySelector('.pop-up');
    this._popUpText = document.querySelector('.pop-up__text');
    const winSound = new Audio('sound/game_win.mp3');
    this.iconChange();
    this._clockTicking.pause();
    winSound.play();
    this._popUp.style.visibility = 'visible';
    this._popUpText.innerText = text;
  }

  iconChange() {
    const icon = document.querySelector('.fa-undo');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-undo');
  }

  replay() {
    this._playBtn = document.querySelector('.replay');
    this._playBtn.addEventListener('click', () => {
      this._popUp.style.visibility = "hidden";
      this._timeRemaining = 180;
      this.startGame();
    })
  }

  
}
