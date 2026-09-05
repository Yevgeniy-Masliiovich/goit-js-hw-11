import axios from 'axios';

export const getImagesByQuery = query => {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: import.meta.env.VITE_PIXABAY_KEY,
        q: query,
        per_page: 9,
        safesearch: true,
        orientation: 'horizontal',
        image_type: 'photo',
      },
    })
    .then(res => res.data);
};
