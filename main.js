const wallyCoordX = 0.73;
const wallyCoordY = 0.54;
const wally = document.querySelector('.big-wally');
const tryAgain = document.querySelector('.try-again');
document.addEventListener('click', (e) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const x = e.pageX / screenWidth;
  const y = e.pageY / screenHeight;

  if(Math.abs(x - wallyCoordX) < 0.1 && Math.abs(y - wallyCoordY) < 0.04) {
    wally.classList.add('active');
  } else {
    tryAgain.classList.add('active');
  }
})

