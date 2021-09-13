import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useHistory } from "react-router-dom";
import "./castDetails.css";

export default function CastDetails() {
  const location = useLocation();
  const { state } = location;
  const { push } = useHistory();
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    push({ ...location, state });
    const API_KEY = "4ecc398414630285446ccb200129c746";
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        const { cast } = data;
        setCast(cast);
      });
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
