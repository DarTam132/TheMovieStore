import * as Views from "./views.js";
import {
  MOCK_API_LINK,
  firstLetterBig,
  strToNumber,
  checkAndAdd,
} from "./config.js";

const logo = document.querySelector(".index-logo");
const loadingSpinner = document.querySelector(".loading-index");
const selectCategory = document.getElementById("categories");
const priceOption = document.getElementById("prices");
const categoryTitle = document.querySelector(".movies-category");
export const moviesNr = document.querySelector(".movies-nr");
let wantedMovie = "";

const allMoviesGallery = async () => {
  try {
    const request = await fetch(MOCK_API_LINK);
    const response = await request.json();
    loadingSpinner.classList.add("hidden");
    response.forEach((movie) => Views.addMoviestoGallery(movie));
  } catch (err) {
    console.error(err);
  }
};

let lsData = JSON.parse(localStorage.getItem("movies"));
let basketmovies;

window.addEventListener("load", async () => {
  setTimeout(allMoviesGallery, 1500);
  basketmovies = lsData === null ? [] : [...lsData];
  if (basketmovies.length !== 0) {
    moviesNr.classList.remove("hidden");
    moviesNr.textContent = basketmovies.length;
  }
});

console.log(logo);
logo.addEventListener("click", () => location.reload());

selectCategory.addEventListener("change", async function () {
  try {
    categoryTitle.textContent = firstLetterBig(this.value);
    const request = await fetch(MOCK_API_LINK);
    const response = await request.json();
    loadingSpinner.classList.add("hidden");
    Views.moviesGallery.innerHTML = "";

    response.forEach((movie) => {
      if (movie.type === this.value) Views.addMoviestoGallery(movie);
      else if (this.value === "all") Views.addMoviestoGallery(movie);
    });
    document.getElementById("prices").selectedIndex = 0;
  } catch (err) {
    console.error(err);
  }
});

priceOption.addEventListener("change", (e) => {
  // Making an array out of the movie gallery
  const priceOrder = e.target.value;
  let cards = Array.from(
    Views.moviesGallery.getElementsByClassName("movie-sticker")
  );
  // Sorting that array
  cards.sort((a, b) => {
    let priceA = parseInt(a.querySelector(".priceTag").textContent.slice(1));
    let priceB = parseInt(b.querySelector(".priceTag").textContent.slice(1));
    return priceOrder === "asc" ? priceA - priceB : priceB - priceA;
  });

  Views.moviesGallery.innerHTML = "";
  // Filling the gallery with the new data
  cards.forEach((card) => Views.moviesGallery.appendChild(card));
});

Views.moviesGallery.addEventListener("click", async (e) => {
  let title = "";
  if (!e.target.classList.contains("details")) return;
  else if (e.target.classList.contains("details"))
    title = e.target.parentNode.children[1].textContent.slice(7);
  const request = await fetch(MOCK_API_LINK);
  const response = await request.json();
  wantedMovie = response.filter((movie) => movie.movie_title === title)[0];
  Views.indexBody.classList.toggle("hidden");
  Views.detailedMovie.classList.toggle("hidden");
  Views.detailedMovieContent(wantedMovie);

  const backBtn = document.querySelector(".back");
  backBtn.addEventListener("click", () => {
    Views.indexBody.classList.toggle("hidden");
    Views.detailedMovie.classList.toggle("hidden");
  });

  const addToBasketBtn = document.querySelector(".basket");
  addToBasketBtn.addEventListener("click", () => {
    checkAndAdd(basketmovies, wantedMovie);
    localStorage.setItem("movies", JSON.stringify(basketmovies));
  });
});
// localStorage.clear();
