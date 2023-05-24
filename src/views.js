export let moviesTable = document.querySelector(".table-content");
export const form = document.querySelector("form");
export const overlay = document.querySelector(".overlay");
export const cancelBtn = document.querySelector("#cancel-btn");
export const mainTable = document.querySelector(".admin-main");
export const titleInput = document.getElementById("title");
export const languageInput = document.getElementById("language");
export const photoInput = document.getElementById("photo");
export const priceInput = document.getElementById("price");
export const typeInput = document.getElementById("type");
export const descriptionInput = document.getElementById("description");
export const moviesGallery = document.querySelector(".movies-container");
export const indexBody = document.querySelector(".index-body");
export const detailedMovie = document.querySelector(".detailed-movie");
export const basketTable = document.querySelector(".basket-content-table");

export const customDOMNav = (el, nr = 0) =>
  el.parentNode.previousSibling.previousSibling.children[nr].textContent;
import {
  movieArray,
  addToMockApi,
  firstLetterBig,
  languageNames,
  language,
} from "./config.js";

export const movieView = (movie) => {
  moviesTable.innerHTML += ` <div class="movie-line ${
    movie.custom_id % 2 === 1 ? "background-odd" : "background-even"
  }">
  <div class="nr-title-img">       
 <span class="movie-number table-style">${movie.custom_id}.</span>
  <img
  class="movie-photo"
  src="${
    movie.movie_photo.length === 32 || movie.movie_photo.length === 31
      ? `https://image.tmdb.org/t/p/w500${movie.movie_photo}`
      : movie.movie_photo
  }"
  alt="Movie poster"/>
  <span class="movie-title table-style">${movie.movie_title}</span>
  </div>
  <div class="price-btns"> 
  <span class="movie-price table-style">${
    movie.price
  }</span><span class="table-style">$</span>
  <button class="change-btn table-style">Change price</button>
  <button class="delete-btn table-style">Delete</button>
  </div>
  </div>`;
};

export const toggle = () => {
  mainTable.classList.toggle("hidden");
  form.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

export const renderNewAddedMovie = async () => {
  const inputs = [
    titleInput,
    languageInput,
    photoInput,
    priceInput,
    typeInput,
    descriptionInput,
  ];

  let nr = (await movieArray()) + 1;

  if (isNaN(Number(priceInput.value)) || !isFinite(priceInput.value)) {
    alert("You entered an invalid value for the movie price!");
    return;
  }
  if (inputs.some((e) => e.value === "")) {
    alert("You need to complete all the dates for the movie!");
    return;
  }
  const newMovie = {
    custom_id: nr,
    movie_title: titleInput.value,
    description: descriptionInput.value,
    language: languageInput.value,
    movie_photo: photoInput.value,
    price: priceInput.value,
    type: typeInput.value,
  };

  movieView(newMovie);
  // Adding the movie to the mock in the same function with the rendering.
  addToMockApi(newMovie);
  toggle();

  inputs.forEach((e) => (e.value = ""));
  return newMovie;
};

export const addMoviestoGallery = (movie) => {
  moviesGallery.innerHTML += `
  <div class="movie-sticker">
  <img
    class="movie-poster"
    src="${
      movie.movie_photo.length === 32 || movie.movie_photo.length === 31
        ? `https://image.tmdb.org/t/p/w500${movie.movie_photo}`
        : movie.movie_photo
    }"
    alt="Movie Poster"
  />
  <span class="title">Title: ${movie.movie_title}</span>
  <span class="title"> Type: ${firstLetterBig(movie.type)}</span>
  <span class="title">Language: ${language(movie.language)}</span>
  <span class="title priceTag">$${movie.price}</span>
  <button class="details">Details</button>
</div>
  `;
};

export const detailedMovieContent = (movie) => {
  detailedMovie.innerHTML = `
  <div class="detailed-movie-container">
  <div class="detailed-movie-title">${movie.movie_title}</div>
  <div class="little-details">
    <span class="lng-type">${language(
      movie.language
    )}</span> <hr class="vertical-break-line" /> <span class="lng-type">${firstLetterBig(
    movie.type
  )}</span><hr class="vertical-break-line" /> <span class="lng-type">${
    movie.price
  }$</span>
  </div>
  <hr class="horizontal-break-line" />
  <div class="main-details">
    <img
    class="detailed-movie-poster"
      src="${
        movie.movie_photo.length === 32 || movie.movie_photo.length === 31
          ? `https://image.tmdb.org/t/p/w500${movie.movie_photo}`
          : movie.movie_photo
      }"
    />
    <div class="description-btns">
      <span class="description"
        ><strong>Description:</strong> ${movie.description}</span>
        <div class="detailed-btns">
      <button class="back">Back</button
      ><button class="basket">Add to basket</button>
    </div>
    </div>
    </div>`;
};

export const renderMoviesFromTheBasket = (movie) => {
  basketTable.innerHTML += `
  <div class="basket-content-row">
   <img src="${
     movie.movie_photo.length === 32 || movie.movie_photo.length === 31
       ? `https://image.tmdb.org/t/p/w500${movie.movie_photo}`
       : movie.movie_photo
   }" alt="Movie Poster" class="basket-movie-img font"/>
   <span class="basket-movie-title font">${movie.movie_title}</span>
   <span class="basket-movie-price font">${movie.price}</span>
   <button class="remove-from-basket font">Remove</button>
  </div>`;
};
