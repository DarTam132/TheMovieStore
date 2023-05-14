import * as Views from "./views.js";
import { MOCK_API_LINK, firstLetterBig, strToNumber } from "./config.js";
const loadingSpinner = document.querySelector(".loading-index");
const selectCategory = document.getElementById("categories");
const priceOption = document.getElementById("prices");
const categoryTitle = document.querySelector(".movies-category");

const allMoviesGallery = async () => {
  try {
    const request = await fetch(MOCK_API_LINK);
    const response = await request.json();
    loadingSpinner.classList.add("hidden");
    response.forEach((movie) => Views.addMoviestoGallery(movie));
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("load", () => setTimeout(allMoviesGallery, 1500));

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

  cards.sort((a, b) => {
    let priceA = parseInt(a.querySelector(".priceTag").textContent.slice(1));
    let priceB = parseInt(b.querySelector(".priceTag").textContent.slice(1));
    return priceOrder === "asc" ? priceA - priceB : priceB - priceA;
  });

  Views.moviesGallery.innerHTML = "";

  cards.forEach((card) => Views.moviesGallery.appendChild(card));
});
