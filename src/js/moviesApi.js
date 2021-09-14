import axios from "axios";

const API_KEY = "4ecc398414630285446ccb200129c746";
function getTrendingApi() {
  const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
  return axios.get(URL).then(({ data }) => data);
}
function searchMoviesApi(querys) {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${querys}&language=en-US&page=1&include_adult=false`;
  return axios.get(URL).then(({ data }) => data);
}

function getMoviesDetailsApi(movieId) {
  const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  return axios.get(URL).then((response) => response);
}

function getMovieCreditsApi(movieId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    )
    .then(({ data }) => data);
}
function getMovieReviewsApi(movieId) {
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
  return axios.get(URL).then(({ data }) => data);
}

export {
  getTrendingApi,
  searchMoviesApi,
  getMoviesDetailsApi,
  getMovieCreditsApi,
  getMovieReviewsApi,
};
