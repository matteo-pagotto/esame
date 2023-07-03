const artworks = [16858, 13914, 51719, 78503];
const baseURL = 'https://api.artic.edu/api/v1/artworks/';

Promise.all(
  artworks.map((id) => fetch(`${baseURL}${id}`))
)
  .then((responses) => Promise.all(responses.map((response) => response.json())))
  .then((data) => {
    data.forEach((artwork, index) => {
      const imageId = artwork.data.image_id;
      const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/full/300,/0/default.jpg`;
      const title = artwork.data.title;
      const artist = artwork.data.artist_title;

      const element = document.createElement('img');
      element.setAttribute('src', imageUrl);
      element.setAttribute('alt', title);

      const targetElementId = ['ala', 'self', 'winter', 'port'][index];
      const targetElement = document.getElementById(targetElementId);
      targetElement.appendChild(element);

      const titleElement = document.createElement('h3');
      titleElement.textContent = title;
      targetElement.appendChild(titleElement);

      const artistElement = document.createElement('p');
      artistElement.textContent = artist;
      targetElement.appendChild(artistElement);
    });
  })
  .catch((error) => console.log(error));
