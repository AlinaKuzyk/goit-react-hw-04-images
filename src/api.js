import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pixabay.com/api/',

  params: {
    key: '32573949-757e2437ffc59d9864e13675e',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

const fetchApi = async (picture, amount = 1) => {
  const response = await api.get('', {
    params: {
      q: picture,
      page: amount,
    },
  });

  return response.data.hits;
};

// const fetchApi = (picture, amount) => {
//   //   console.log(picture);
//   return fetch(
//     `https://pixabay.com/api/?q=${picture}&page=${amount}&key=32573949-757e2437ffc59d9864e13675e&image_type=photo&orientation=horizontal&per_page=12`
//   );
// };

export default fetchApi;
