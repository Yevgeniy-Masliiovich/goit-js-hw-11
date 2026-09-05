import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import * as pixabay from './js/pixabay-api';
import * as render from './js/render-functions';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', e => {
  e.preventDefault();
  searchHeandler(e.currentTarget.elements['search-text'].value.trim());
});

const searchHeandler = searchText => {
  render.clearGallery();

  if (!validate(searchText)) {
    showErrorMessage('Please enter a valid query.');
    return;
  }

  render.showLoader();

  pixabay
    .getImagesByQuery(searchText)
    .then(data => {
      const images = data.hits;

      if (images.length === 0) {
        showErrorMessage(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      } else {
        render.createGallery(images);
      }
    })
    .catch(error => {
      console.error(error);
      showErrorMessage('Error while executing request');
    })
    .finally(() => {
      render.hideLoader();
    });
};

function validate(searchText) {
  return searchText;
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
