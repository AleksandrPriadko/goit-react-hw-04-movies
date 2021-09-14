import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { getMovieCreditsApi } from "../../js/moviesApi";
import "./castDetails.css";

export default function CastDetails() {
  const location = useLocation();
  const { state } = location;
  const { push } = useHistory();
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    push({ ...location, state });
    getMovieCreditsApi(movieId)
      .then(({ cast }) => setCast(cast))
      .catch((error) => `Error, ${error.message}`);
  }, []);

  return (
    <>
      <ul>
        {cast.map(({ id, name, profile_path }) => (
          <li className="itemCast" key={id}>
            <div>
              <img
                className="imgCast"
                src={`https://image.tmdb.org/t/p/original${profile_path}`}
                alt={name}
              />
              <p>{name}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
