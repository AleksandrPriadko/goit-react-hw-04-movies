import React, { Component } from "react";
import axios from "axios";

class MovieDetailsPage extends Component {
  state = {
    poster: null,
    id: null,
    genre: null,
    about: null,
    title: null,
  };

  componentDidMount = () => {
    const { movieId } = this.props.match.params;
    console.log(movieId);
    const URL = `https://api.themoviedb.org/3/movie/${movieId}`;
    const API_KEY = "4ecc398414630285446ccb200129c746";
    axios
      .get(`${URL}?api_key=${API_KEY}&language=en-US`)
      .then(({ data }) =>
        this.setState({
          movies: data,
        })
      )
      .catch((error) => `Error ${error.message}`);
  };

  render() {
    const { poster, id, genre, about, title } = this.state;
    console.log(movies);
    return (
      <div>
        <img src={poster} alt={title} />
        <h2>{}</h2>
        <h1>This movie</h1>
      </div>
    );
  }
}

export default MovieDetailsPage;
