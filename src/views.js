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
import { movieArray } from "./config.js";

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
  alt="Movie poster"
  />
  <span class="movie-title table-style"
    >${movie.movie_title}</span
  >
  </div>
  <div class="price-btns"> 
  <span class="movie-price table-style">${movie.price}$</span>
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
  toggle();
  // console.log(nr);
  // console.log(newMovie);
  inputs.forEach((e) => (e.value = ""));
  return newMovie;
};
