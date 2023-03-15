function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;
const INTERVAL_DELAY = 1000;
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bodyColor: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  intervalId = setInterval(() => {
    let color = getRandomHexColor();
    refs.bodyColor.style.background = color;
  }, INTERVAL_DELAY);
});

refs.stopBtn.addEventListener('click', () => {
  refs.startBtn.disabled = false;
  clearInterval(intervalId); 
});
