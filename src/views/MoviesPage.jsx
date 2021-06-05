import React, { Component } from "react";
import axios from "axios";
import MoviesForm from "../components/MoviesForm";
import { Link } from "react-router-dom";

class MoviesPage extends Component {
  state = {
    query: "",
    results: [],
  };

  formSubmitHandler = (query) => {
    console.log(query);
    this.setState({ query: query });
    this.handleRequest(query);
  };

  handleRequest = (query) => {
    //const { query } = this.state;
    console.log(query);
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`;
    axios.get(URL).then(({ data }) => {
      console.log(data);
      this.setState({ results: data.results });
    });
  };

  render() {
    const { results } = this.state;
    console.log(results);
    //this.handleRequest();
    return (
      <>
        <MoviesForm onSubmit={this.formSubmitHandler} />
        <ul>
          {results.map(({ id, title }) => (
            <li key={id}>
              <Link to={`${this.props.match.url}/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MoviesPage;
