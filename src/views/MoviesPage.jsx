import React, { Component } from "react";
import axios from "axios";
import MoviesForm from "../components/MoviesForm";
import { Link, withRouter } from "react-router-dom";

class MoviesPage extends Component {
  state = {
    query: "",
    results: [],
  };

  formSubmitHandler = (query) => {
    console.log(query);
    this.setState({ query: query });
    this.handleRequest(query);
    this.onMoviesSearch(query);
  };

  onMoviesSearch = (query) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `?query=${query}`,
    });
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
    const { results, query } = this.state;
    const { location } = this.props;
    console.log(this.props.location);
    //this.handleRequest();
    return (
      <>
        <MoviesForm onSubmit={this.formSubmitHandler} query={query} />
        <ul>
          {results.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `${this.props.match.url}/${id}`,
                  state: {
                    from: location,
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
}

export default withRouter(MoviesPage);
