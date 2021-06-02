import React, { Component } from "react";

class MoviesPage extends Component {
  render() {
    return (
      <>
        <form>
          <input type="text" name="name" />
          <button type="submite">Search</button>
        </form>
      </>
    );
  }
}

export default MoviesPage;
