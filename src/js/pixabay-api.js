import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function searchImages(query, currentPage) {
  const params = {
    key: '44431015-10991196da62062e34a604eda',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page: currentPage,
  };
  try {
    const { data } = await axios.get('', { params });
    return data;
  } catch (err) {
    console.log('server error', err);
  }
}
