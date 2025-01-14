import { useEffect, useState } from "react";
import { getCast } from "../../services/api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import s from "./MovieCast.module.css";
import noPhotos from "../../assets/noPhotos.svg";

const MovieCast = () => {
  const { moviesId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieCast = async () => {
      setIsLoading(true);
      try {
        const data = await getCast(moviesId);
        setCast(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (moviesId) {
      getMovieCast();
    }
  }, [moviesId]);

  return (
    <div className={s.wrapperActor}>
      {isLoading ? (
        <Loader />
      ) : cast && cast.length > 0 ? (
        cast.map((actor) => (
          <div className={s.idActor} key={actor.id}>
            {actor.profile_path ? (
              <img
                className={s.imgActor}
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            ) : (
              <img className={s.noImage} src={noPhotos} alt="No Image" />
            )}
            <div className={s.informActer}>
              <p className={s.nameActor}>
                <strong>{actor.name}</strong>
              </p>
              <p className={s.characterActor}>Character: {actor.character}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No cast available</p>
      )}
    </div>
  );
};

export default MovieCast;
