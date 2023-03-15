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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < new Date()) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.warning(
        'Чертов мазафака накосячил в дате, выбери другую'
      );
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', () => {
        startCounter(selectedDates);
      });
    }
  },
};

flatpickr(refs.datetimePicker, options);

function startCounter(selectedDates) {
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = Math.floor(selectedDates - currentTime);
    const time = convertMs(deltaTime);

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      resetValues();
    } else {
      padValue(time);
    }
  }, DELAY);
}
// Текстовый контент приводим к строке, ну точнее цифровой значение приводим к строке для передачи в Текстовый Контент.
function padValue(time) {
  refs.secondsValue.textContent = time.seconds.toString().padStart(2, '0');
  refs.minutesValue.textContent = time.minutes.toString().padStart(2, '0');
  refs.hoursValue.textContent = time.hours.toString().padStart(2, '0');
  refs.daysValue.textContent = time.days.toString().padStart(2, '0');
}

function resetValues() {
  refs.daysValue.textContent = 0;
  refs.hoursValue.textContent = 0;
  refs.minutesValue.textContent = 0;
  refs.secondsValue.textContent = 0;
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
