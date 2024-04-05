import { useEffect, useState } from "react";
import { fetchData } from "../../MoviesApi";
import MovieList from "../../components/MovieList/MovieList";
import Error from "../../components/Error/Error";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchedData() {
      try {
        setError(false);
        const data = await fetchData();
        setData(data.results);
      } catch (error) {
        setError(true);
      }
    }

    fetchedData();
  }, []);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      {error && <Error />}
      {data && <MovieList data={data} />}
    </main>
  );
};

export default HomePage;
