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

export const languageNames = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  cn: "Chinese",
  ar: "Arabic",
  ru: "Russian",
  hi: "Hindi",
  bn: "Bengali",
  ur: "Urdu",
  fa: "Persian",
  tr: "Turkish",
  nl: "Dutch",
  pl: "Polish",
  sv: "Swedish",
  no: "Norwegian",
  fi: "Finnish",
  da: "Danish",
  he: "Hebrew",
  el: "Greek",
  cs: "Czech",
  sk: "Slovak",
  hu: "Hungarian",
  ro: "Romanian",
  th: "Thai",
  vi: "Vietnamese",
  ms: "Malay",
  id: "Indonesian",
  fil: "Filipino",
  // add more language codes and names as needed
};
export const language = (lang) => languageNames[lang];
// Population the mock API with data from the movie DB API

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

      const mockApi = await fetch(MOCK_API_LINK, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(customData),
      });

      console.log(customData);
    }

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

    return res.length;
  } catch (err) {
    console.error(err);
  }
};

export const addToMockApi = async (movie) => {
  const mockApi = await fetch(MOCK_API_LINK, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movie),
  });
};

export const strToNumber = (str) =>
  +str
    .split("")
    .filter((e) => !isNaN(+e))
    .join("");

export const firstLetterBig = (str) => str[0].toUpperCase() + str.slice(1);

// export const getMoviesForGallery = async () => {
//   const request = await fetch(MOCK_API_LINK);
//   const response = await request.json();
// };
