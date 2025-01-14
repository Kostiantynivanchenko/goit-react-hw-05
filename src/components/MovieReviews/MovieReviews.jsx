import { useEffect, useState } from "react";
import s from "./MovieReviews.module.css";
import { getReviews } from "../../services/api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { moviesId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieReviews = async () => {
      setIsLoading(true);
      try {
        const data = await getReviews(moviesId);
        setReviews(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (moviesId) {
      getMovieReviews();
    }
  }, [moviesId]);

  return (
    <div className={s.wrapperReviews}>
      {isLoading ? (
        <Loader />
      ) : reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={s.reviewItem}>
            <h3 className={s.authorName}>{review.author}</h3>
            <p className={s.content}>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
