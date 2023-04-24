import { MOVIE_DB_URL, types, MOCK_API_LINK } from "./config.js";

const getMovies = async (type) => {
  try {
    let movies = [];

    const genreId = types[type];
    if (!genreId) {
      throw new Error(`Invalid genre type: ${type}`);
    }

    const response = await fetch(`${MOVIE_DB_URL}${genreId}`);
    if (!response.ok)
      throw new Error(`Failed to fetch movies from page ${page}`);

    const data = await response.json();
    movies.push(...data.results);
    console.log(movies);
    movies.forEach(async (movie) => {
      const customData = {
        movie_title: movie.original_title,
        description: movie.overview,
        language: movie.original_language,
        movie_photo: movie.poster_path,
        price: Math.floor(Math.random() * 50),
        type: type,
      };

      const mockApi = await fetch(MOCK_API_LINK, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(customData),
      });

      const customResponse = await mockApi.json();
      console.log(customResponse);
    });

    return movies;
  } catch (error) {
    console.error(error);
  }
};
// getMovies("action");
// getMovies("love");
getMovies("animated");
// getMovies("horror");
