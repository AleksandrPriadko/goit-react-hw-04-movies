import React, { Component } from "react";
//import queryString from "query-string";

class MoviesForm extends Component {
  state = {
    name: "",
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ name: e.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onSubmit(this.state.name);
    this.reset();
  };
  reset = () => {
    this.setState({ name: "" });
  };

  //const queryParams = queryString.parse(props.location.search);

  render() {
    const { name } = this.state;
    return (
      <>
        <form className="d-flex d-grid gap-3" onSubmit={this.handleSubmit}>
          <input
            className="form-control me-2"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </>
    );
  }
}

export default MoviesForm;
