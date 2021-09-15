import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { getMovieReviewsApi } from "../Api/moviesApi";

export default function ReviewsDetails() {
  const location = useLocation();
  const { state } = location;
  const { push } = useHistory();
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    push({ ...location, state });
    getMovieReviewsApi(movieId)
      .then(({ results }) => {
        setReviews(results);
        setContent(
          results.map(({ content }) => {
            return content;
          })
        );
      })
      .catch((error) => error.messages);
  }, []);

  return (
    <>
      {content.length ? (
        <ul>
          {reviews.map(({ id, content }) => (
            <li key={id}> {content}</li>
          ))}
        </ul>
      ) : (
        <h3>We don`t any reviews for this movie</h3>
      )}
    </>
  );
}
