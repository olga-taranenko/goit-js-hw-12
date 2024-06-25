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

  if (searchValue === '') {
    hideLoadBtn();
    galleryElem.innerHTML = '';
    displayMessage('Please enter data for search', '#ffa000');
    return;
  }
  showLoader();
  hideLoadBtn();
  try {
    currentPage = 1;
    const data = await searchImages(searchValue, currentPage);
    maxPage = Math.ceil(data.total / perPage);

    if (data.hits.length === 0) {
      galleryElem.innerHTML = '';
      displayMessage(
        'Sorry, there are no images matching your search query. Please try again!',
        '#ef4040'
      );
      hideLoader();
      updateBtnStatus();
    } else {
      const markup = imagesTemplate(data.hits);
      galleryElem.innerHTML = markup;

      lightbox.refresh();
    }
  } catch (err) {
    displayMessage(
      'An error occurred while fetching photos. Please try again later.',
      '#EF4040'
    );
  }
  updateBtnStatus();
  hideLoader();
  formSearch.reset();
}

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  hideLoadBtn();
  showLoader();

  try {
    const data = await searchImages(searchValue, currentPage);
    const markup = imagesTemplate(data.hits);
    galleryElem.insertAdjacentHTML('beforeend', markup);
    scrollOldElements();
  } catch (err) {
    displayMessage(
      'An error occurred while fetching photos. Please try again later.',
      '#EF4040'
    );
  }

  lightbox.refresh();

  hideLoader();
  updateBtnStatus();
});

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

function showLoadBtn() {
  loadMoreBtn.classList.remove('visually-hidden');
}

function hideLoadBtn() {
  loadMoreBtn.classList.add('visually-hidden');
}
function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadBtn();
    if (maxPage) {
      displayMessage(
        'We are sorry, but you have reached the end of search results.',
        '#89CFF0'
      );
    }
  } else {
    showLoadBtn();
  }
}

function scrollOldElements() {
  const liElem = galleryElem.children[0];
  const height = liElem.getBoundingClientRect().height;
  scrollBy({
    top: height * 3 + 72,
    behavior: 'smooth',
  });
}
