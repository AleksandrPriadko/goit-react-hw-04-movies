import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import "./App.css";
import HomePage from "./views/HomePage";
import MoviesPage from "./views/MoviesPage";
import MovieDetailsPage from "./views/MovieDetailsPage";
import NotFoundView from "./components/NotFoundView";

class App extends Component {
  state = {};

  render() {
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
