import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import s from "./MoviesList.module.css";

const MoviesList = ({ movies, isLoading }) => {
  const location = useLocation();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={s.movies}>
          {movies
            .filter((item) => item.poster_path)
            .map((item) => (
              <li key={item.id} className={s.movieItem}>
                <NavLink
                  state={location}
                  to={`/movies/${item.id}`}
                  onClick={() => console.log("Item ID", item.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                  />
                </NavLink>
                <h3>{item.title}</h3>
                <p>
                  Release:{" "}
                  {item.release_date ? item.release_date : "Date unknown"}
                </p>
                <p>
                  Vote average: {item.vote_average ? item.vote_average : "N/A"}
                </p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

// PropTypes validation
MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MoviesList;
