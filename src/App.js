import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import React, { Component } from "react";
const { Route, Switch, NavLink } = require("react-router-dom");

class App extends Component {
  render() {
    return (
      <>
        <nav>
          <ul>
            <li>
              <NavLink
                exact
                className="NavLink"
                activeClassName="NavLink--active"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="NavLink"
                activeClassName="NavLink--active"
                to="/movies"
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    );
  }
}

export default App;
