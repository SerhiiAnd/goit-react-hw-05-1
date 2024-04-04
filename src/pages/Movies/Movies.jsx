// // import { useEffect, useState } from "react";
// // import { Formik, Field, Form } from "formik";
// // import { searchMovie } from "../../MoviesApi";
// // import { useSearchParams } from "react-router-dom";
// // import MovieList from "../../components/MovieList/MovieList";
// // import Loader from "../../components/Loader/Loader";
// // import Error from "../../components/Error/Error";
// // import css from "./Movies.module.css";

// // const Movies = () => {
// //   const [movies, setMovies] = useState([]);
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [empty, setEmpty] = useState(false);
// //   const [error, setError] = useState(false);

// //   const handleSubmit = (values, actions) => {
// //     const inputVale = values.query;
// //     setSearchParams({ query: inputVale });
// //     actions.resetForm();
// //   };

// //   useEffect(() => {
// //     const searchQuery = searchParams.get("query");
// //     if (!searchQuery) return;

// //     async function fetchedData() {
// //       try {
// //         setEmpty(false);
// //         setMovies([]);
// //         setIsLoading(true);
// //         const data = await searchMovie(searchQuery);
// //         setMovies(data.results);
// //         if (!data.results.length) setEmpty(true);
// //       } catch (error) {
// //         setError(true);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }

// //     fetchedData();
// //   }, [searchParams]);

// //   return (
// //     <>
// //       {/* <Formik
// //         initialValues={{
// //           query: "",
// //         }}
// //         onSubmit={handleSubmit}
// //       >
// //         <Form>
// //           <Field name="query" />
// //           <button type="submit">Search</button>
// //         </Form>
// //       </Formik> */}
// //       <div className={css.container}>
// //         <Formik
// //           initialValues={{
// //             searchInput: inputMovieValue,
// //           }}
// //           onSubmit={handleSubmit}
// //         >
// //           <Form className={css.form}>
// //             <Field
// //               className={css.input}
// //               name="searchInput"
// //               placeholder="Search movies..."
// //             ></Field>
// //             <button className={css.btn} type="submit">
// //               Search
// //             </button>
// //           </Form>
// //         </Formik>
// //       </div>

// //       {isLoading && <Loader />}
// //       {error && <Error />}
// //       {empty && <div>There are no movies at your request</div>}
// //       {!empty && <MovieList data={movies} />}
// //     </>
// //   );
// // };

// // export default Movies;
// import { useEffect, useState } from "react";
// import { Formik, Field, Form } from "formik";
// import { searchMovie } from "../../MoviesApi";
// import { useSearchParams } from "react-router-dom";
// import MovieList from "../../components/MovieList/MovieList";
// import Loader from "../../components/Loader/Loader";
// import Error from "../../components/Error/Error";
// import css from "./Movies.module.css";

// const Movies = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [empty, setEmpty] = useState(false);
//   const [error, setError] = useState(false);
//   const inputMovieValue = "";

//   const handleSubmit = (values, actions) => {
//     const inputValue = values.searchInput;
//     setSearchParams({ query: inputValue });
//     actions.resetForm();
//   };

//   useEffect(() => {
//     const searchQuery = searchParams.get("query");
//     if (!searchQuery) return;

//     async function fetchedData() {
//       try {
//         setEmpty(false);
//         setMovies([]);
//         setIsLoading(true);
//         const data = await searchMovie(searchQuery);
//         setMovies(data.results || []);
//         if (!data.results || data.results.length === 0) setEmpty(true);
//       } catch (error) {
//         setError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchedData();
//   }, [searchParams]);

//   return (
//     <>
//       <div className={css.container}>
//         <Formik
//           initialValues={{
//             searchInput: inputMovieValue,
//           }}
//           onSubmit={handleSubmit}
//         >
//           <Form className={css.form}>
//             <Field
//               className={css.input}
//               name="searchInput"
//               placeholder="Search movies..."
//             ></Field>
//             <button className={css.btn} type="submit">
//               Search
//             </button>
//           </Form>
//         </Formik>
//       </div>

//       {isLoading && <Loader />}
//       {error && <Error />}
//       {empty && <div>There are no movies at your request</div>}
//       {!empty && <MovieList data={movies} />}
//     </>
//   );
// };

// export default Movies;

import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { searchMovie } from "../../MoviesApi";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import css from "./Movies.module.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const inputMovieValue = "";

  const handleSubmit = (values, actions) => {
    const inputValue = values.searchInput;
    setSearchParams({ query: inputValue });
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
        setMovies(data.results || []);
        if (!data.results || data.results.length === 0) setEmpty(true);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchedData();
  }, [searchParams]);

  return (
    <div className={css.pageContainer}>
      <div className={css.searchContainer}>
        <Formik
          initialValues={{
            searchInput: inputMovieValue,
          }}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <Field
              className={css.input}
              name="searchInput"
              placeholder="Search movies..."
            ></Field>
            <button className={css.btn} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>

      {isLoading && <Loader />}
      {error && <Error />}
      {empty && <div>There are no movies at your request</div>}
      {!empty && <MovieList data={movies} />}
    </div>
  );
};

export default Movies;
