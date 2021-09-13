import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory, useLocation } from "react-router-dom";

export default function ReviewsDetails() {
  const location = useLocation();
  const { state } = location;
  const { push } = useHistory();
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    push({ ...location, state });
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
    axios
      .get(URL)
      .then(({ data }) => {
        const { results } = data;
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
