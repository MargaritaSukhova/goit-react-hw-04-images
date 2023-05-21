const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34919786-dfee0391f92fa2ae99264bebb';
const PER_PAGE = '12';

const SearchImages = (query, page) => {
  return fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  ).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error('Something went wrong'));
    }
    return response.json();
  });
};

export default SearchImages;
