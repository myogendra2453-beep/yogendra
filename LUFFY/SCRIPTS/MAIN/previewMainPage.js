import { mainImagesData } from './mainImagesData.js';

const receivedData = JSON.parse(localStorage.getItem('selectedImageData'));
if (receivedData) {
  prevoewUpdate(receivedData);
}

function prevoewUpdate(Imgdata) {
  const name = Imgdata.imageTags.find(tag => typeof tag === 'object').animeCharacterName[0];
  const animeName = Imgdata.imageTags.find(tag => typeof tag === 'object').animeName[0];

  document.querySelector('.preview-title h1').textContent = name;
  document.querySelector('.anime-name h1').textContent = animeName;
  document.querySelector('.for-border img').src = Imgdata.imageUrl;

  const { favourites, downloads } = Imgdata.imageCounts;
  document.querySelector('.favourites-count h4').textContent = favourites;
  document.querySelector('.downloads-count h4').textContent = downloads;

  const imageTags = Imgdata.imageTags.flatMap(tag =>
    typeof tag === 'string' ? [tag] : Object.values(tag).flat()
  );

  const tagsHTML = imageTags.map(tag => `
    <div class="tag">
      <h3>${tag}</h3>
      <i class="fa-regular fa-circle-xmark"></i>
    </div>
  `).join('');

  document.querySelector('.tags').innerHTML = tagsHTML;
}

const secondImagesContainer = document.querySelector('.second-images');
secondImagesContainer.innerHTML = '';
mainImagesData.forEach((item) => {
  secondImagesContainer.innerHTML += `
    <div class="grid-item">
      <div class="image-wrapper">
        <img src="${item.imageUrl}" alt="">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <div class="image-footer">
        <i class="fa-regular fa-star"></i>
        <i class="fa-solid fa-download"></i>
      </div>
    </div>
  `;
});

const mainIMagesContainer = document.querySelector('.main-images');
mainIMagesContainer.innerHTML = '';
mainImagesData.forEach((item) => {
  mainIMagesContainer.innerHTML += `
    <div class="grid-item">
      <div class="image-wrapper">
        <img src="${item.imageUrl}" alt="">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <div class="image-footer">
        <i class="fa-regular fa-star"></i>
        <i class="fa-solid fa-download"></i>
      </div>
    </div>
  `;
});

document.querySelectorAll('.image-wrapper img').forEach((imgElem) => {
  imgElem.addEventListener('click', () => {
    const clickedSrc = imgElem.getAttribute('src');
    const clickedImageData = mainImagesData.find(item => item.imageUrl === clickedSrc);

    if (clickedImageData) {
      localStorage.setItem('selectedImageData', JSON.stringify(clickedImageData));
      prevoewUpdate(clickedImageData);
    }
  });
});
