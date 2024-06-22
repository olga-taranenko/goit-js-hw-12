import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImages } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';

const formSearch = document.querySelector('.form');
const galleryElem = document.querySelector('.gallery');
const loaderElem = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
});

formSearch.addEventListener('submit', onSearchBtnSubmit);

function onSearchBtnSubmit(event) {
  event.preventDefault();

  const searchValue = formSearch.elements.search.value.trim();

  if (searchValue === '') {
    galleryElem.innerHTML = '';
    displayMessage('Please enter data for search', '#ffa000');
    return;
  }
  showLoader();

  searchImages(searchValue)
    .then(data => {
      if (data.hits.length === 0) {
        galleryElem.innerHTML = '';
        displayMessage(
          'Sorry, there are no images matching your search query. Please try again!',
          '#ef4040'
        );
      } else {
        const markup = imagesTemplate(data.hits);
        galleryElem.innerHTML = markup;
        lightbox.refresh();
      }
    })
    .catch(err =>
      displayMessage(
        'An error occurred while fetching photos. Please try again later.',
        '#EF4040'
      )
    )
    .finally(() => {
      hideLoader();
    });

  formSearch.reset();
}

function displayMessage(message, color) {
  iziToast.show({
    message: message,
    position: 'topRight',
    backgroundColor: color,
    messageColor: '#fff',
    theme: 'dark',
    maxWidth: '350px',
  });
}

function showLoader() {
  loaderElem.classList.remove('visually-hidden');
}

function hideLoader() {
  loaderElem.classList.add('visually-hidden');
}
