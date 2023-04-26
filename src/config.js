export const apiKey = `3d04aea08cd22c983a876e984b0457b7`;
export const MOVIE_DB_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&with_genres=`;
export const types = {
  love: 10749,
  action: 28,
  horror: 27,
  animated: 16,
};
export const MOCK_API_LINK =
  "https://644285cb33997d3ef912811f.mockapi.io/admin/movies";

// Population the mock API with data from the movie DB API
// let customId = 1;
const getMovies = async (type, id) => {
  try {
    let movies = [];
    let customId = id;
    const genreId = types[type];
    if (!genreId) {
      throw new Error(`Invalid genre type: ${type}`);
    }

    const response = await fetch(`${MOVIE_DB_URL}${genreId}`);
    if (!response.ok)
      throw new Error(`Failed to fetch movies from page ${page}`);

    const data = await response.json();
    movies.push(...data.results);
    // console.log(movies);

    // movies.forEach(async (movie) => {
    for (const movie of movies) {
      const customData = {
        custom_id: customId++,
        movie_title: movie.original_title,
        description: movie.overview,
        language: movie.original_language,
        movie_photo: movie.poster_path,
        price: Math.floor(Math.random() * 50),
        type: type,
      };
      // customDataArray.push(customData);

      const mockApi = await fetch(MOCK_API_LINK, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(customData),
      });

      // const customResponse = await mockApi.json();
      // customId++;
      console.log(customData);
    }
    // console.log(customDataArray);
    return movies;
  } catch (error) {
    console.error(error);
  }
};

// getMovies("action", 1);

// getMovies("love", 21);

// getMovies("animated", 41);

// getMovies("horror", 61);

export const movieArray = async () => {
  try {
    const getMovies = await fetch(MOCK_API_LINK);
    if (!getMovies.ok) throw err;
    const res = await getMovies.json();
    // console.log(res.length);
    return res.length;
  } catch (err) {
    console.error(err);
  }
};

// console.log(nr);


