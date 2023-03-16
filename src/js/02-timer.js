import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const DELAY = 1000;

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let currentTime = new Date().getTime();
let pickedTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedTime = selectedDates[0].getTime();
    pickDate();
  },
};

function pickDate() {
  if (pickedTime < currentTime) {
    Notiflix.Notify.failure('Нет нет нет, выбери другое время !!!');
  } else {
    refs.startBtn.disabled = false;
  }
}

flatpickr(refs.datetimePicker, options);

refs.startBtn.addEventListener('click', startCounter);

function startCounter() {
  const intervalId = setInterval(() => {
    refs.startBtn.disabled = true;
    let time = convertMs(pickedTime - Date.now());

    if (time.seconds < 0) {
      clearInterval(intervalId);

    } else {
      padValue(time);
    }
  }, DELAY);
}
// Текстовый контент приводим к строке, ну точнее цифровой значение приводим к строке для передачи в Текстовый Контент.
function updateValue(value) {
  return String(value).padStart(2, '0');
}

function padValue({ days, hours, minutes, seconds }) {
  refs.secondsValue.textContent = updateValue(`${seconds}`);
  refs.minutesValue.textContent = updateValue(`${minutes}`);
  refs.hoursValue.textContent = updateValue(`${hours}`);
  refs.daysValue.textContent = updateValue(`${days}`);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
