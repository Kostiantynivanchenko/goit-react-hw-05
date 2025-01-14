import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Loader from "../../components/Loader/Loader";
import { fetchMoviesByTitle } from "../../services/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import s from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMoviesByTitle(query);
        console.log(data);
        setMovies(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query]);

  const onSubmit = (values) => {
    console.log(values);
    if (!values.query) {
      setSearchParams({});
      return;
    }
    setSearchParams({ query: values.query });
  };

  return (
    <div>
      <Formik initialValues={{ query }} onSubmit={onSubmit}>
        <Form className={s.wrapperFormAction}>
          <Field
            className={s.inputMovie}
            name="query"
            type="text"
            placeholder="Enter your movie"
          />
          <button className={s.buttonSearchMovie} type="submit">
            Search movie
          </button>
        </Form>
      </Formik>

      {query && !isLoading && (
        <>
          {movies.length > 0 ? (
            <MoviesList movies={movies} isLoading={isLoading} />
          ) : (
            <p className={s.notFoundQuery}> No movies found for {query}.</p>
          )}
        </>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default MoviesPage;
