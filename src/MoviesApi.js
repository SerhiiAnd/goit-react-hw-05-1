import axios from "axios";

const url = "https://api.themoviedb.org/3";

const options = {
  params: { language: "en-US" },
  include_adult: false,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWY1NzY2MTg5MTg0ZDAyMTc4ZDQ1YTA4YTY0MjdjOSIsInN1YiI6IjY1ZWRmN2M3YTliOWE0MDE2NGQ1OGU3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fGU9I9jYSggrc10jKyE1rX9L6Klj1YuobKvmS5ya-o8",
  },
  accept: "application/json",
};

axios.defaults.baseURL = url;

export async function fetchData() {
  const response = await axios.get("trending/movie/day", options);

  return response.data;
}

export async function fetchMovieData(movieId) {
  const response = await axios.get(`movie/${movieId}`, options);

  return response.data;
}

export async function fetchReviews(movieId) {
  const response = await axios.get(`movie/${movieId}/reviews`, options);

  return response.data;
}

export async function fetchCast(movieId) {
  const response = await axios.get(`movie/${movieId}/credits`, options);

  return response.data;
}

export async function searchMovie(query) {
  options.params.query = query;

  const response = await axios.get("search/movie", options);

  return response.data;
}
