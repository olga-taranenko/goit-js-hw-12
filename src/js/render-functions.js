export function imageTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery-item"><a href="${largeImageURL}" class="gallery-link"><img src="${webformatURL}" alt="${tags}" class="gallery-img"/></a>
  <ul class="descr">
      <li class="descr-item">
        <p><b>Likes</b></p>
        <p>${likes}</p>
      </li>
      <li class="descr-item">
        <p><b>Views</b></p>
        <p>${views}</p>
      </li>
      <li class="descr-item">
        <p><b>Comments</b></p>
        <p>${comments}</p>
      </li>
      <li class="descr-item">
        <p><b>Downloads</b></p>
        <p>${downloads}</p>
      </li>
    </ul>
    </li>`;
}

export function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}
