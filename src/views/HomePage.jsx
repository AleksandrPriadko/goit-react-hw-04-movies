import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
    axios.get(URL).then(({ data }) => {
      setTrendingMovies(data.results);
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
