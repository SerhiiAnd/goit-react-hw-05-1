import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../MoviesApi";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function getMovieReviews() {
      try {
        setLoading(true);
        const data = await fetchReviews(movieId);
        setMovieReviews(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getMovieReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <h3 className={css.load}>Loading...</h3>}

      {movieReviews.length === 0 ? (
        <p className={css.noReviews}>No reviews available</p>
      ) : (
        <ul className={css.list}>
          {movieReviews.map((review) => (
            <li className={css.item} key={review.id}>
              <h2 className={css.name}>{review && review.author}</h2>
              <p className={css.p}>{review && review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
