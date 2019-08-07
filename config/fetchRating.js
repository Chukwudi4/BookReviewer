import { IDREAM_KEY } from './keys';

export async function fectchRating(term) {
  options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const url = `https://idreambooks.com/api/books/reviews.json?key=${IDREAM_KEY}&q=${term}`;

  try {
    let result = await fetch(url, options);
    response = await result.json();
    console.warn(response);
    return response;
  } catch (error) {
    console.warn(error.message);
    return {};
  }
}
