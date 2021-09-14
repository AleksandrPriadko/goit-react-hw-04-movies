import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import MoviesForm from "../components/MoviesForm";
import { searchMoviesApi } from "../js/moviesApi";

export default function MoviesPage() {
  const location = useLocation();
  const { pathname, state } = location;
  const { push } = useHistory();

  const [querys, setQuerys] = useState(state || "");
  const [results, setResults] = useState([]);

  const formSubmitHandler = (query) => {
    setQuerys(query);
    setResults([]);
  };

  const handleRequest = () => {
    searchMoviesApi(querys)
      .then(({ results }) => {
        return setResults(results);
      })
      .catch((error) => `Error, ${error.message}`);
  };

  useEffect(() => {
    if (!querys) return;
    handleRequest();
  }, [querys]);

  useEffect(() => {
    push({
      ...location,
      search: querys ? `?query=${querys}` : "",
    });
  }, [results]);

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
