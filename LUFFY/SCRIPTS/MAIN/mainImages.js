import { mainImagesData } from './mainImagesData.js';

const imagesContainer = document.querySelector('.main-home-images');
imagesContainer.innerHTML = '';
const clearedContainer = imagesContainer;

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

const shuffledData = shuffleArray(mainImagesData);

showImages(shuffledData);

function showImages(dataArray) {
  imagesContainer.innerHTML = '';
  dataArray.forEach((item, index) => {
    imagesContainer.innerHTML += `
      <div class="grid-item">
        <div class="image-wrapper">
          <img src="${item.imageUrl}" loading="lazy" alt="">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <div class="image-footer">
          <i class="fa-regular fa-star"></i>
          <i class="fa-solid fa-download"></i>
        </div>
      </div>
    `;
  });


}

///////////////////////////////////////////////////////////////////////


let allTags = new Set();

mainImagesData.forEach((item) => {
  item.imageTags.forEach((tag) => {
    if (typeof tag === 'string') {
      allTags.add(tag);
    } else if (typeof tag === 'object') {
      Object.values(tag).forEach((subArr) => {
        subArr.forEach((value) => allTags.add(value));
      });
    }
  });
});

let availableKeywords = [...allTags];

const resultsBox = document.querySelector('.row-expand');
const inputBox = document.getElementById('input-box');

inputBox.onkeyup = function () {
  let result = [];
  let input = inputBox.value;

  if (input.length) {
    result = availableKeywords.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
    document.querySelector('.search-box').classList.add('search-active');
  } else {
    document.querySelector('.search-box').classList.remove('search-active');
    showImages(shuffledData); // Show all again
  }

  display(result);
};


