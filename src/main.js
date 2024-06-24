import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImages } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';

const formSearch = document.querySelector('.form');
const galleryElem = document.querySelector('.gallery');
const loaderElem = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.loadmore-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
});

let searchValue;
let currentPage = 1;
let maxPage = 1;
const perPage = 15;

formSearch.addEventListener('submit', onSearchBtnSubmit);

async function onSearchBtnSubmit(event) {
  event.preventDefault();

  searchValue = formSearch.elements.search.value.trim();
  currentPage = 1;

  if (searchValue === '') {
    galleryElem.innerHTML = '';
    displayMessage('Please enter data for search', '#ffa000');
    hideLoadBtn();
    return;
  }
  showLoader();

  try {
    hideLoadBtn();
    const data = await searchImages(searchValue, currentPage);

    if (data.hits.length === 0) {
      galleryElem.innerHTML = '';
      displayMessage(
        'Sorry, there are no images matching your search query. Please try again!',
        '#ef4040'
      );
      hideLoadBtn();
    } else {
      maxPage = Math.ceil(data.total / perPage);
      const markup = imagesTemplate(data.hits);
      galleryElem.innerHTML = markup;

      updateBtnStatus();

      lightbox.refresh();
    }
  } catch (err) {
    displayMessage(
      'An error occurred while fetching photos. Please try again later.',
      '#EF4040'
    );
    hideLoadBtn();
  }

  hideLoader();
  formSearch.reset();
}

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  hideLoadBtn();
  const data = await searchImages(searchValue, currentPage);
  const markup = imagesTemplate(data.hits);
  galleryElem.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();

  updateBtnStatus();
});

function displayMessage(message, color) {
  iziToast.show({
    message: message,
    position: 'bottomRight',
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

function showLoadBtn() {
  loadMoreBtn.classList.remove('visually-hidden');
}

function hideLoadBtn() {
  loadMoreBtn.classList.add('visually-hidden');
}
function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadBtn();
  } else {
    showLoadBtn();
  }
}
