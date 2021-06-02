import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import "./App.css";
import HomePage from "./views/HomePage";
import MoviesPage from "./views/MoviesPage";
import MovieDetailsPage from "./views/MovieDetailsPage";
import NotFoundView from "./views/NotFoundView";

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              className="NavLink"
              activeClassName="NavLink-active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className="NavLink"
              activeClassName="NavLink-active"
            >
              Movies
            </NavLink>
          </li>
        </ul>

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={NotFoundView} />
        </Switch>
      </>
    );
  }
}

export default App;
