import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "8adc8d01e7de70ca25d1593f89dedeb0";

const options = {
  params: { language: "en-US", api_key: API_KEY },
  include_adult: false,
  headers: {
    Authorization:
      "TOKIEN eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWRjOGQwMWU3ZGU3MGNhMjVkMTU5M2Y4OWRlZGViMCIsInN1YiI6IjY2MGM0MDBjMGI1ZmQ2MDE2MjM2ZWE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WZ-cxIGyN3rrojnPlrG3qTiKlL0YF1f---Ss4HFW1WQ",
  },
  accept: "application/json",
};

axios.defaults.baseURL = BASE_URL;

export async function fetchData() {
  try {
    const response = await axios.get("trending/movie/day", options);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
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
