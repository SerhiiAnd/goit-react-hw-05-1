import { Link, useLocation } from "react-router-dom";
import css from "./Reviews.module.css";

const MovieList = ({ data }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {data.map((el) => {
        return (
          <li key={el.id} className={css.item}>
            <Link to={`/movies/${el.id}`} state={location}>
              {el.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
