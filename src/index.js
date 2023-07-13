import './styles.css';
import axios from "axios";
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const divCatInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
 
loader.classList.add('hidden');
error.classList.add('hidden');

fetchBreeds()
    .then(breeds => {
         loader.classList.remove('hidden');
      markupBreeds(breeds);
      new SlimSelect({
        select: select,
      });
         loader.classList.add('hidden');
    })
    .catch(error => {
      console.log(error);
      loader.classList.add('hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });


function markupBreeds(breeds) {
    divCatInfo.classList.add('hidden');
    loader.classList.remove('hidden');
    const markup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  select.innerHTML = markup;
  select.classList.remove('hidden');
    loader.classList.add('hidden');
    error.classList.add('hidden');
    }

select.addEventListener('change', onselectCat);

// блоці div.cat-info з'являється зображення і розгорнута
//  інформація про кота: назва породи, опис і темперамент.
function markupCat(cat) {
    loader.classList.remove('hidden');
    const markup = cat.map(cat => {
    return `
    <img class="cat-image" src="${cat.url}" width="400" alt="cat">
     <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <p>>${cat.breeds[0].temperament}</p>
    `
      });
    divCatInfo.innerHTML = markup;
    divCatInfo.classList.remove('hidden');
    error.classList.add('hidden');
    loader.classList.add('hidden');
    }


function onselectCat(event) {
    loader.classList.remove('hidden');
    divCatInfo.classList.add('hidden');
      fetchCatByBreed(event.currentTarget.value)
      .then(cat => markupCat(cat)
           )
    .catch(error => {
      console.log(error);
      loader.classList.add('hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
    select.classList.remove('hidden');
    loader.classList.add('hidden');
  };



