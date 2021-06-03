import React, { Component } from "react";
import axios from "axios";

class MovieDetailsPage extends Component {
  state = {
    poster: null,
    title: null,
    score: null,
    overview: null,
    genres: [],
  };

  componentDidMount = () => {
    const { movieId } = this.props.match.params;
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    axios.get(URL).then(({ data }) => {
      console.log(data);
      this.setState({
        poster: `https://image.tmdb.org/t/p/original${data.poster_path}`,
        title: data.title,
        overview: data.overview,
        genres: data.genres.map((genre) => genre.name),
      });
    });
  };

  render() {
    const { poster, title, overview, genres } = this.state;

    return (
      <div>
        <button>Go back</button>
        <div>
          <img className="pictures" src={poster} alt={title} />
          <div>
            <h1>{title}</h1>
            <p>User Score:</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <p>{genres.join(", ")}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetailsPage;
