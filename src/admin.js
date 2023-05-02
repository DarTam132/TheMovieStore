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
const questionForm = document.querySelector(".question");
// const questionMovie = document.querySelector(".question-movie");

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
        const customId = strToNumber(Views.customDOMNav(price, 0));

        const request = await fetch(`${MOCK_API_LINK}/${customId}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ price: +price.textContent }),
        });
      }
    });
  }
});

window.addEventListener("load", () => setTimeout(mockAPImovies, 1500));

tableOfContent.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const customId = strToNumber(Views.customDOMNav(e.target));
    const title = Views.customDOMNav(e.target, 2);
    const titleElement = e.target.parentNode.parentNode;

    tableOfContent.classList.toggle("hidden");
    questionForm.classList.toggle("hidden");
    questionForm.innerHTML = `
     <div class="question-movie table-style">
      Are you sure that you want to remove the movie with the title <strong class="table-style">${title}</strong>?
    </div>
    <div class="btns">
    <button class="yes-btn add-btn table-style">YES</button>
    <button class="no-btn add-btn table-style">NO</button>
    </div>`;
    questionForm.addEventListener("click", async (e) => {
      if (e.target.classList.contains("no-btn")) {
        tableOfContent.classList.remove("hidden");
        questionForm.classList.add("hidden");
      } else if (e.target.classList.contains("yes-btn")) {
        titleElement.remove();
        tableOfContent.classList.remove("hidden");
        questionForm.classList.add("hidden");
        const request = await fetch(`${MOCK_API_LINK}/${customId}`, {
          method: "DELETE",
        });
      }
    });
  }
});
// parentNode.previousSibling.previousSibling.children[nr].textContent;
