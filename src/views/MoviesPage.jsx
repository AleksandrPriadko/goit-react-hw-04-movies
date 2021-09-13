/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import MoviesForm from "../components/MoviesForm";

export default function MoviesPage() {
  const location = useLocation();
  const { pathname, state } = location;
  const { push } = useHistory();

  const [querys, setQuerys] = useState(state || "");
  const [results, setResults] = useState([]);

  const formSubmitHandler = (query) => {
    setQuerys(query);
  };

  useEffect(() => {
    push({
      ...location,
      search: `query=${querys}`,
    });
  }, [querys]);

  const handleRequest = () => {
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${querys}&language=en-US&page=1&include_adult=false`;

    return axios.get(URL).then(({ data }) => {
      setResults(data.results);
    });
  };

  useEffect(() => {
    if (!querys) return;
    handleRequest();
  }, [querys]);

  return (
    <>
      <MoviesForm onSubmit={formSubmitHandler} />
      <ul>
        {results.map(({ id, title }) => (
          <li key={id}>
            <Link
              to={{
                pathname: `${pathname}/${id}`,
                state: {
                  from: location,
                  querys,
                  label: "Back to search",
                },
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
