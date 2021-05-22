import React, { Component } from "react";
import axios from "axios";
const { Route, Switch, Link } = require("react-router-dom");
class HomePage extends Component {
  state = {
    films: [],
  };

  componentDidMount = () => {
    const URL = "https://api.themoviedb.org/3/trending/movie/week";
    const API_KEY = "4ecc398414630285446ccb200129c746";
    axios
      .get(`${URL}?api_key=${API_KEY}`)
      .then(({ data }) => {
        this.setState({
          films: data.results,
        });
      })
      .catch((error) => `Error ${error.message}`);
  };

  render() {
    const { films } = this.state;
    const url = this.props.match.url;

    return (
      <>
        <h1>Trending this week</h1>
        <ul>
          {films.map(({ id, original_title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{original_title}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomePage;
