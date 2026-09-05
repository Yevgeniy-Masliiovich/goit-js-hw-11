import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const { delay: delayEl, state: stateEl } = e.currentTarget.elements;
  createNotification(delayEl.value, stateEl.value);
});

const createNotification = (delay, state) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => showSuccessMessage(`✅ Fulfilled promise in ${delay}ms`))
    .catch(delay => showErrorMessage(`❌ Rejected promise in ${delay}ms`));
};

function showSuccessMessage(message) {
  iziToast.show({
    message: message,
    position: 'topRight',
    theme: 'dark',
    backgroundColor: '#59A10D',
    messageColor: '#fff',
    animateInside: false,
  });
}

function showErrorMessage(message) {
  iziToast.error({
    message: message,
    position: 'topRight',
    theme: 'dark',
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    animateInside: false,
  });
}
