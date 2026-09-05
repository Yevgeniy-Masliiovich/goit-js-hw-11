import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startTimerBtnEl = document.querySelector('.start-timer-btn');
const inputDateTimePickerEl = document.querySelector('.input-datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minuteEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate;
let timerId;

function showErrorMessage(message) {
  iziToast.error({
    message: message,
    position: 'topCenter',
    theme: 'dark',
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    iconColor: '#fff',
    icon: 'icon-error-octagon',
    animateInside: false,
  });
}

function validateDate(date) {
  const currentDate = new Date();
  return date.getTime() > currentDate.getTime();
}

const addLeadingZero = num => String(num).padStart(2, '0');

const startTimer = () => {
  startTimerBtnEl.disabled = true;
  inputDateTimePickerEl.disabled = true;

  timerId = setInterval(() => {
    renderTimer();
  }, 1000);
};

startTimerBtnEl.addEventListener('click', startTimer);

const stopTimer = () => {
  inputDateTimePickerEl.disabled = false;
  clearInterval(timerId);
};

function renderTimer() {
  const currentDate = new Date();
  const diff = userSelectedDate.getTime() - currentDate.getTime();

  if (diff < 0) {
    stopTimer();
    return;
  }

  const diffParts = convertMs(diff);

  daysEl.textContent = addLeadingZero(diffParts.days);
  hoursEl.textContent = addLeadingZero(diffParts.hours);
  minuteEl.textContent = addLeadingZero(diffParts.minutes);
  secondsEl.textContent = addLeadingZero(diffParts.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (!validateDate(userSelectedDate)) {
      showErrorMessage(`Please choose a date in the future`);
      startTimerBtnEl.disabled = true;
    } else {
      startTimerBtnEl.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);
