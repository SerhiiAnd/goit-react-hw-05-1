import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { searchMovie } from "../../MoviesApi";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (values, actions) => {
    const inputVale = values.query;
    setSearchParams({ query: inputVale });
    actions.resetForm();
  };

  useEffect(() => {
    const searchQuery = searchParams.get("query");
    if (!searchQuery) return;

    async function fetchedData() {
      try {
        setEmpty(false);
        setMovies([]);
        setIsLoading(true);
        const data = await searchMovie(searchQuery);
        setMovies(data.results);
        if (!data.results.length) setEmpty(true);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchedData();
  }, [searchParams]);

  return (
    <>
      <Formik
        initialValues={{
          query: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>

      {isLoading && <Loader />}
      {error && <Error />}
      {empty && <div>There are no movies at your request</div>}
      {!empty && <MovieList data={movies} />}
    </>
  );
};

export default MoviesPage;
