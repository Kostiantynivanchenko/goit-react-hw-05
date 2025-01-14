import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getFullDataMovie } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const location = useLocation();
  const goBackRef = useRef(location.state);

  const { moviesId } = useParams();
  const [fullData, setFullData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Movie ID: ", moviesId);
      const data = await getFullDataMovie(moviesId);
      setFullData(data);
    };

    fetchData();
  }, [moviesId]);

  if (!fullData) return <Loader />;

  const genres =
    fullData.genres && fullData.genres.length > 0
      ? fullData.genres.map((genre) => genre.name).join(", ")
      : "No genres available";
  console.log(genres);

  return (
    <>
      <NavLink to={goBackRef.current || "/"} className={s.goBack}>
        Go back
      </NavLink>
      <div className={s.wrapperMovieDetails}>
        <img
          className={s.movieImg}
          src={`https://image.tmdb.org/t/p/w500/${fullData.poster_path}`}
          alt={fullData.title}
        />

        <div className={s.movieContent}>
          <div className={s.movieText}>
            <h1>{fullData.title}</h1>
            <p>{fullData.overview}</p>
            <p>Rating: {fullData.popularity}</p>
            <p>Genres: {genres}</p>
          </div>
        </div>

        <div className={s.castRewiewsWrapper}>
          <NavLink to="cast" className={s.navLink}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={s.navLink}>
            Reviews
          </NavLink>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default MovieDetailsPage;
