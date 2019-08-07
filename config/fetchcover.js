export async function fetchCover(isbn) {
  console.warn('ssdv');
  options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  var response = await fetch(url, options);
  var respJson = await response.json();

  return respJson.items[0].volumeInfo.imageLinks.thumbnail;
}
