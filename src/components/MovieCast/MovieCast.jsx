import { useEffect, useState } from "react";
import { getCast } from "../../services/api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import s from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

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
            <img
              className={actor.profile_path ? s.imgActor : s.noImage}
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
            />
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
