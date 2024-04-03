import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieData } from "../../MoviesApi";
import Loader from "react-js-loader";

const MovieDetails = () => {
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const backLinkHref = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchedData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieData(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchedData();
  }, [movieId]);

  const showGenres = () =>
    movie.genres.reduce((acc, el) => (acc += ` ${el.name}`), "");

  if (!movie) return;

  return (
    <>
      <button>
        <Link to={backLinkHref.current}>Go back</Link>
      </button>

      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Oops something went wrong! Try reload the page</div>}
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
        )}
        <div>
          <h1>{movie.title}</h1>
          <p>User Score: {parseInt(movie.vote_average * 10)}%</p>
          <h2>
            <b>Overview</b>
          </h2>
          <p>{movie.overview ? movie.overview : "There are no overview"}</p>
          <h3>
            <b>Genres</b>
          </h3>
          <p>{showGenres() ? showGenres() : "Genre not yet specified"}</p>
        </div>
      </div>

      <hr />
      <p>Additional information</p>

      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <hr />

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
