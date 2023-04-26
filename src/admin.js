import { MOVIE_DB_URL, types, MOCK_API_LINK, movieArray } from "./config.js";
import * as Views from "./views.js";

const loadingSpinner = document.querySelector(".loading");
const addBtn = document.querySelector(".add-btn");
const mainTable = document.querySelector(".admin-main");
const form = document.querySelector("form");
const overlay = document.querySelector(".overlay");
const cancelBtn = document.querySelector("#cancel-btn");
const addForm = document.querySelector(".add-to-mock");

addBtn.addEventListener("click", Views.toggle);
overlay.addEventListener("click", Views.toggle);
cancelBtn.addEventListener("click", () => {
  Views.toggle();
  inputs.forEach((e) => (e.value = ""));
});

const addToMockApi = async (movie) => {
  let nr = (await movieArray()) + 1;
  const newMovie = {
    custom_id: nr,
    movie_title: movie.movie_title,
    description: movie.description,
    language: movie.language,
    movie_photo: movie.movie_photo,
    price: movie.price,
    type: movie.type,
  };
  const mockApi = await fetch(MOCK_API_LINK, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newMovie),
  });

  // const customResponse = await mockApi.json();
};

addForm.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    await Views.renderNewAddedMovie();
    await addToMockApi(Views.renderNewAddedMovie());
  } catch (err) {
    console.error(err);
  }
});

const mockAPImovies = async () => {
  try {
    const res = await fetch(MOCK_API_LINK);
    const mockApi = await res.json();

    //Rendering the movies in the admin section with the help of the exported movieView function
    mockApi.forEach((movie) => Views.movieView(movie)),
      loadingSpinner.classList.add("hidden");
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener("load", () => setTimeout(mockAPImovies, 1500));
