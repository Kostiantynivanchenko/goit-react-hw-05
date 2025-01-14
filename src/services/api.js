import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODBjMGI4ZGZjYTQ0OTE1MzczMTZiOTUzMDhjZDA2NyIsIm5iZiI6MTczNjg0MTgyOS4xMjcsInN1YiI6IjY3ODYxYTY1MWZjMGVjN2YwODdiMDIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.942MTubZDE01xQG6f4G7eW8ynbfiql0z3YRNn2rMe7I";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};

const fetchTrendingMovies = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/trending/movie/day?language=en-US`,
    options
  );
  return data.results;
};

const fetchMoviesByTitle = async (query) => {
  const { data } = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data.results;
};

const getFullDataMovie = async (moviesId) => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${moviesId}?language=en-US`,
    options
  );
  return data;
};

const getCast = async (moviesId) => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${moviesId}/credits?language=en-US`,
    options
  );
  return data.cast;
};

const getReviews = async (moviesId) => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${moviesId}/reviews?language=en-US&page=1`,
    options
  );
  return data.results;
};

export {
  fetchTrendingMovies,
  fetchMoviesByTitle,
  getFullDataMovie,
  getCast,
  getReviews,
};
