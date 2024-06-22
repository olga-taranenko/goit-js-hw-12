export function searchImages(q) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const PARAMS = new URLSearchParams({
    key: '44431015-10991196da62062e34a604eda',
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${BASE_URL}${END_POINT}?${PARAMS}`;

  const headers = {
    'X-RateLimit-Limit':
      'The maximum number of requests that the consumer is permitted to make in 30 minutes.',
    'X-RateLimit-Remaining':
      'The number of requests remaining in the current rate limit window.',
    'X-RateLimit-Reset':
      'The remaining time in seconds after which the current rate limit window resets.',
  };
  return fetch(url).then(res => res.json());
}
