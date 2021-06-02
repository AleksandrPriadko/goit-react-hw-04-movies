import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class HomePage extends Component {
  state = {
    trendingMovies: [],
  };

  componentDidMount = () => {
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
    axios.get(URL).then(({ data }) => {
      console.log(data);
      this.setState({
        trendingMovies: data.results,
      });
    });
  };

  render() {
    const { trendingMovies } = this.state;
    const { url } = this.props.match;
    console.log(url);
    return (
      <>
        <h1>Trending today</h1>
        <ul>
          {trendingMovies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomePage;
