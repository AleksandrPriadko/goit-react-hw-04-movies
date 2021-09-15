import React, { useState, useEffect } from "react";
import { getTrendingApi } from "../Api/moviesApi";
import { Link, useLocation } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    getTrendingApi()
      .then(({ results }) => {
        setTrendingMovies(results);
      })
      .catch(function (error) {
        return `Error, ${error.message}`;
      });
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {trendingMovies.map(({ id, title }) => (
          <li key={id}>
            <Link to={{ pathname: `/movies/${id}`, state: { from: location } }}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
