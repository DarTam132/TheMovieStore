import { renderMoviesFromTheBasket } from "./views.js";

const numberOfItems = document.querySelector(".items-span-nr");
const totalPrice = document.querySelector(".items-total-val");
const checkoutBtn = document.querySelector(".proceed");
const basketTable = document.querySelector(".basket-content-table");
let lsData = JSON.parse(localStorage.getItem("movies"));

numberOfItems.textContent = lsData.length;

let price = 0;
lsData.forEach((movie) => (price += movie.price));
lsData.forEach((movie) => renderMoviesFromTheBasket(movie));
totalPrice.textContent = price;

checkoutBtn.addEventListener("click", () =>
  alert(
    "This is a personal project and it's not selling anything. But anyway thank you for arriving in this point with the exploring of the project. Have a wonderful day!"
  )
);

basketTable.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-from-basket")) {
    const title =
      e.target.previousElementSibling.previousElementSibling.textContent;
    const minusPrice = e.target.previousElementSibling.textContent;
    price -= minusPrice;
    let index = lsData.findIndex((e) => e.movie_title === title);
    lsData.splice(index, 1);
    e.target.parentNode.remove();

    localStorage.setItem("movies", JSON.stringify(lsData));
    numberOfItems.textContent = lsData.length;
    totalPrice.textContent = price;
  }
});
