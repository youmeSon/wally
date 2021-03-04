'use strict';

class Game {

  constructor(image, stage) {
    this._timeRemaining = 180;
    this._timerRunning = false;
    this._timer = null;
    this._image = image;
    this._clockTicking = null;
    this._popUp = null;
    this._popUpText = null;
    this._playBtn = null;
    this._replayBtn = null;
    this._nextBtn = null;
    this._stage = stage;
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

  set image(value) {
    this._image = value;
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

  get stage() {
    return this._stage;
  }

  get replayBtn() {
    return this._replayBtn;
  }

  get nextBtn() {
    return this._nextBtn;
  }

  startGame(image) {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.pop-up').style.visibility = 'hidden';
    if(image != null){
      document.querySelector('#background-img').src = `img/${image.name}`;
    }
    this.startTimer();
    this.tickingSound();
    this.findingWally(image);
  }

  resetGame(){
    this._replayBtn.style.display = "none";
    this._popUp.style.visibility = "hidden";
    this._timeRemaining = 180;
    this.startTimer();
    this.tickingSound();
  }

  startTimer() {
    this.updateTimeText(this._timeRemaining);
    this._timer = setInterval(() => {
      if(this._timeRemaining <= 0) {
        clearInterval(this._timer);
        this.gameOver("You Lost😈");
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
      const popupVisible = document.querySelector('.pop-up').style.visibility == 'visible'
      const fartSound = new Audio('sound/fart.mp3');
        if(wally.classList.contains('active')) {
          wally.classList.remove('active');
        } else if(!popupVisible && Math.abs(x - image.xCoordinate) < 0.003 && Math.abs(y - image.yCoordinate) < 0.02) {
          wally.classList.add('active');
          tryAgain.classList.remove('active');
          this.nextStage("Next Stage? 🎉")
          this.stopTimer();
        } else if(!popupVisible && Math.abs(x - image.xOdlaw) < 0.003 && Math.abs(y - image.yOdlaw) < 0.04) {
          fartSound.play();
        } else if(!popupVisible && !(e.target.classList.contains("start__game") || e.target.classList.contains("start__box") ||e.target.classList.contains("fa-play") ||  e.target.classList.contains("fa-undo") ||e.target.classList.contains("replay") ||e.target.classList.contains("next") || e.target.classList.contains('reload'))) {
          tryAgain.classList.add('active');
        }

        if(e.target.classList.contains('try-again')) {
          tryAgain.classList.remove('active');
        }
    })
  } 
  
  gameOver(text) {
    document.querySelector('.next').style.display = "none";
    this._popUp = document.querySelector('.pop-up');
    this._popUpText = document.querySelector('.pop-up__text');
    const alertSound = new Audio('sound/alert.wav');
    this._clockTicking.pause();
    alertSound.play();
    this._popUp.style.visibility = 'visible';
    this._popUpText.innerText = text;
    this.field();
    this.replay();
  }

  field() {
    document.addEventListener('click', () => {
      console.log('hello');
    });
  }
  onFieldClick() {
    if(!this._started) {
      return;
    }
  }

  nextStage(text) {
    this._popUp = document.querySelector('.pop-up');
    this._popUpText = document.querySelector('.pop-up__text');
    const winSound = new Audio('sound/game_win.mp3');
    this._timeRemaining = 180;
    this._clockTicking.pause();
    winSound.play();
    this.nextBtn();
    this._popUp.style.visibility = 'visible';
    this._popUpText.innerText = text;
    
  }

  iconChangeToPlay() {
    const icon = document.querySelector('.fa-undo');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-undo');
  }
  iconChangeToUndo() {
    const icon = document.querySelector('.fa-play');
    icon.classList.add('fa-undo');
    icon.classList.remove('fa-play');
  }
  
  nextBtn() {
    this._nextBtn = document.querySelector('.next');
    this._nextBtn.style.display = "block"
  }

  replay() {
    this._replayBtn = document.querySelector('.replay');
    this._replayBtn.style.display = "block";
  }

  theEnd() {
    const theEnd = document.querySelector('.theEnd');
    const reload = document.querySelector('.reload');
    const triumphSound = new Audio('sound/triumph-sound.mp3')
    theEnd.style.visibility = 'visible';
    triumphSound.play();
    document.querySelector('.pop-up').style.visibility = 'hidden';
    reload.addEventListener('click', () => {
      location.reload()
    })
  }

  
}
