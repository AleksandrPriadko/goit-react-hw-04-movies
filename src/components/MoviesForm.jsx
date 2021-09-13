import React, { useState } from "react";
import PropTypes from "prop-types";

export default function MoviesForm({ onSubmit }) {
  const [name, setName] = useState("");
  const handleChange = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName("");
  };
  return (
    <>
      <form className="d-flex d-grid gap-3" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
}

MoviesForm.propTypes = {
  onSubmit: PropTypes.func,
};
