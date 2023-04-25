import { MOVIE_DB_URL, types, MOCK_API_LINK } from "./config.js";
let moviesTable = document.querySelector(".table-content");

const mockAPImovies = async () => {
  const res = await fetch(MOCK_API_LINK);
  const mockApi = await res.json();
  mockApi.forEach((movie) => {
    moviesTable.innerHTML += ` <div class="movie-line ${
      movie.id % 2 === 1 ? "background-odd" : "background-even"
    }">
    <div class="nr-title-img">
      <span class="movie-number table-style">${movie.id}.</span>
      <img
        class="movie-photo"
        src="https://image.tmdb.org/t/p/w500${mockApi[movie.id].movie_photo}"
        alt=""
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
  });
  console.log(moviesTable);
  // const imgElement = document.createElement("img"); // Create img element
  // imgElement.src = `https://image.tmdb.org/t/p/w500${mockApi[9].movie_photo}`; // Set src attribute to movie image URL
  // document.body.appendChild(imgElement);
  console.log(mockApi);
};

mockAPImovies();
//  movies.forEach((movie) => {
//     const imgElement = document.createElement("img"); // Create img element
//     imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Set src attribute to movie image URL
//     document.body.appendChild(imgElement); // Append img element to the body or any other desired location in the HTML document
//   });
