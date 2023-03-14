function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}




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
  onClose(selectedDates) {
    if (selectedDates < new Date()) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure(
        'Чертов мазафака накосячил в дате, выбери другую'
      );
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', () => {
        startCounter(selectedDates);
      });
    }
    console.log(selectedDates[0]);
  },
};

function startCounter(selectedDates) {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDates - currentTime;
    const time = convertMs(deltaTime);

    if (deltaTime <= 0) {
      clearInterval(intervalId);
    } else {
      padValues(time);
    }
  }, DELAY);
}

function padValues(time) {
  refs.secondsValue.textContent = formatedDifferenceInMs.seconds
    .toString()
    .padStart(2, '0');
  refs.minutesValue.textContent = formatedDifferenceInMs.minutes
    .toString()
    .padStart(2, '0');
  refs.hoursValue.textContent = formatedDifferenceInMs.hours
    .toString()
    .padStart(2, '0');
  refs.daysValue.textContent = formatedDifferenceInMs.days
    .toString()
    .padStart(2, '0');
}

function resetValues() {
  refs.daysValue.textContent = '00';
  refs.hoursValue.textContent = '00';
  refs.minutesValue.textContent = '00';
  refs.secondsValue.textContent = '00';
}

flatpickr(refs.datetimePicker, options);

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
