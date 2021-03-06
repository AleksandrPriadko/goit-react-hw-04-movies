import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import "./App.css";
const HomePage = lazy(() =>
  import("./views/HomePage" /* webpackChunkName: "home-views" */)
);
const MoviesPage = lazy(() =>
  import("./views/MoviesPage" /* webpackChunkName: "Movies-views" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetails-views" */
  )
);

export default function App() {
  return (
    <>
      <ul className="nav nav-pills nav-justified ">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/movies" className="nav-link" activeClassName="active">
            Movies
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Suspense>
    </>
  );
}
