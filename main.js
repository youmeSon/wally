const wallyCoordX = 0.7389;
const wallyCoordY = 0.5435;
const wally = document.querySelector('.big-wally');
const tryAgain = document.querySelector('.try-again');
document.addEventListener('click', (e) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const x = e.pageX / screenWidth;
  const y = e.pageY / screenHeight;

  if(wally.classList.contains('active')) {
    location.reload();
  } else if(Math.abs(x - wallyCoordX) < 0.003 && Math.abs(y - wallyCoordY) < 0.04) {
    wally.classList.add('active');
  } else {
    tryAgain.classList.add('active');
  }

  if(e.target.classList.contains('try-again')){
    tryAgain.classList.remove('active');
  } 
  
})
