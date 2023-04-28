import {
  MOVIE_DB_URL,
  types,
  MOCK_API_LINK,
  movieArray,
  strToNumber,
} from "./config.js";
import * as Views from "./views.js";

const loadingSpinner = document.querySelector(".loading");
const addBtn = document.querySelector(".add-btn");
const mainTable = document.querySelector(".admin-main");
const form = document.querySelector("form");
const overlay = document.querySelector(".overlay");
const cancelBtn = document.querySelector("#cancel-btn");
const addForm = document.querySelector(".add-to-mock");
const tableOfContent = document.querySelector(".table-content");

addBtn.addEventListener("click", Views.toggle);
overlay.addEventListener("click", Views.toggle);
cancelBtn.addEventListener("click", () => {
  Views.toggle();
  inputs.forEach((e) => (e.value = ""));
});

addForm.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    await Views.renderNewAddedMovie();
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

tableOfContent.addEventListener("click", (e) => {
  if (e.target.classList.contains("change-btn")) {
    const price = e.target.previousElementSibling.previousElementSibling;
    price.contentEditable = true;
    price.focus();
    const initialPrice = price.textContent;
    price.textContent = "";
    price.addEventListener("keydown", async (e) => {
      if (
        isNaN(+price.textContent) ||
        (+price.textContent <= 0 && e.key === "Enter")
      ) {
        alert("You need the write a valid number!");
        price.contentEditable = false;
        price.blur();
        price.textContent = initialPrice;
        return;
      } else if (!isNaN(+price.textContent) !== NaN && e.key === "Enter") {
        e.preventDefault();
        price.contentEditable = false;
        price.blur();
        const customId = strToNumber(Views.customDOMNav(price));

        const request = await fetch(`${MOCK_API_LINK}/${customId}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ price: +price.textContent }),
        });
      }
    });
  }
});
