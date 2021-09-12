/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviesForm from "../components/MoviesForm";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function MoviesPage() {
  const location = useLocation();
  const { pathname, state } = location;
  console.log(pathname);
  const { push } = useHistory();

  const [querys, setQuerys] = useState("");
  const [results, setResults] = useState([]);
  // console.log(querys);
  const formSubmitHandler = (query) => {
    setQuerys(query);
    //console.log(query);

    onMoviesSearch(query);
  };

  const onMoviesSearch = (query) => {
    console.log(querys);
    push({
      ...location,
      search: `?query=${query}`,
    });
  };

  const handleRequest = () => {
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${querys}&language=en-US&page=1&include_adult=false`;

    return axios.get(URL).then(({ data }) => {
      setResults(data.results);
    });
  };
  useEffect(() => {
    if (!querys) return;
    handleRequest();
  }, [querys]);

  return (
    <>
      <MoviesForm onSubmit={formSubmitHandler} />
      <ul>
        {results.map(({ id, title }) => (
          <li key={id}>
            <Link to={{ pathname: `${pathname}/${id}`, state: { location } }}>
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
