import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ data }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {data.map((el) => {
        return (
          <li key={el.id} className={css.item}>
            <Link to={`/movies/${el.id}`} state={location}>
              <div className={css.cont}>
                {el.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                    alt={el.title}
                    width={250}
                  />
                )}
                <p>{el.title}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
