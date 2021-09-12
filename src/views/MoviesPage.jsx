import React, { useState } from "react";
import axios from "axios";
import MoviesForm from "../components/MoviesForm";
import { Link } from "react-router-dom";

export default function MoviesPage({ location, history, match }) {
  const [querys, setQuerys] = useState("");
  const [results, setResults] = useState([]);

  const formSubmitHandler = (query) => {
    setQuerys(query);
    onMoviesSearch();
    handleRequest();
  };

  const onMoviesSearch = () => {
    history.push({
      pathname: location.pathname,
      search: `?query=${querys}`,
    });
  };

  const handleRequest = () => {
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${querys}&language=en-US&page=1&include_adult=false`;
    axios.get(URL).then(({ data }) => {
      setResults(data.results);
    });
  };

  return (
    <>
      <MoviesForm onSubmit={formSubmitHandler} />
      <ul>
        {results.map(({ id, title }) => (
          <li key={id}>
            <Link
              to={{
                pathname: `${match.url}/${id}`,
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

// class MoviesPage extends Component {
//   state = {
//     query: "",
//     results: [],
//   };

//   formSubmitHandler = (query) => {
//     console.log(query);
//     this.setState({ query: query });
//     this.handleRequest(query);
//     this.onMoviesSearch(query);
//   };

//   onMoviesSearch = (query) => {
//     this.props.history.push({
//       pathname: this.props.location.pathname,
//       search: `?query=${query}`,
//     });
//   };

//   handleRequest = (query) => {
//     const API_KEY = "4ecc398414630285446ccb200129c746";
//     const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`;
//     axios.get(URL).then(({ data }) => {
//       console.log(data);
//       this.setState({ results: data.results });
//     });
//   };

//   render() {
//     const { results } = this.state;
//     const { location } = this.props;
//     console.log(this.props.location);
//     //this.handleRequest();
//     return (
//       <>
//         <MoviesForm onSubmit={this.formSubmitHandler} />
//         <ul>
//           {results.map(({ id, title }) => (
//             <li key={id}>
//               <Link
//                 to={{
//                   pathname: `${this.props.match.url}/${id}`,
//                   state: {
//                     from: location,
//                   },
//                 }}
//               >
//                 {title}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </>
//     );
//   }
// }

// export default withRouter(MoviesPage);
