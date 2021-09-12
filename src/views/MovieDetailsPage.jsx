import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import CastDetails from "../components/CastDetails";
import ReviewsDetails from "../components/ReviewsDetails";
//import queryString from "query-string";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function MovieDetailsPage() {
  const location = useLocation();
  const { pathname, state } = location;
  const { push } = useHistory();
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  const [poster, setPoster] = useState(null);
  const [title, setTitle] = useState(null);
  const [score, setScore] = useState(null);
  const [overview, setOverview] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    console.log(location);
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    axios.get(URL).then(({ data }) => {
      setPoster(`https://image.tmdb.org/t/p/original${data.poster_path}`);
      setTitle(data.title);
      setOverview(data.overview);
      setGenres(data.genres.map((genre) => genre.name));
      setScore(data.vote_average);
    });
  }, []);

  const handleGoBack = () => {
    console.log(location);
    // console.log(state);
    push({
      pathname: location.state.location.pathname,
      search: location.state.location.search,
    });
    // const { location, history } = this.props;
    // console.log(location);
    // this.props.history.push({
    //   pathname: this.props.location.pathname,
    //   search: `?query=${query}`,
    // });

    // history.push(location.state.from);

    // const queryParams = queryString.parse(location.state.from.search);
    // history.push(queryParams);
    // console.log(queryParams);
  };

  const percent = Math.round((score * 100) / 10);

  return (
    <div>
      <button type="button" onClick={handleGoBack}>
        Go back
      </button>
      <div>
        <img className="pictures" src={poster} alt={title} />
        <div>
          <h1>{title}</h1>
          <p>User Score: {`${percent}%`}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <p>{genres.join(", ")}</p>
        </div>
      </div>
      <div>
        <ul>
          <li>
            <NavLink to={`${url}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/reviews`}>Reviews</NavLink>
          </li>
        </ul>
      </div>

      <Switch>
        <Route path="/movies/:movieId/cast">
          <CastDetails />
        </Route>
        <Route path="/movies/:movieId/reviews">
          <ReviewsDetails />
        </Route>
      </Switch>
    </div>
  );
}

// class MovieDetailsPage extends Component {
//   state = {
//     poster: null,
//     title: null,
//     score: null,
//     overview: null,
//     genres: [],
//   };

//   componentDidMount = () => {
//     const { movieId } = this.props.match.params;
//     const API_KEY = "4ecc398414630285446ccb200129c746";
//     const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
//     axios.get(URL).then(({ data }) => {
//       this.setState({
//         poster: `https://image.tmdb.org/t/p/original${data.poster_path}`,
//         title: data.title,
//         overview: data.overview,
//         genres: data.genres.map((genre) => genre.name),
//         score: data.vote_average,
//       });
//     });
//   };
//   // handleGoBack = () => {
//   //   const { location, history } = this.props;
//   //   console.log(location);
//   //   // this.props.history.push({
//   //   //   pathname: this.props.location.pathname,
//   //   //   search: `?query=${query}`,
//   //   // });

//   //   history.push(location.state.from);

//   //   //const queryParams = queryString.parse(location.state.from.search);
//   //   // history.push(queryParams);
//   //   // console.log(queryParams);
//   // };

//   render() {
//     const { poster, title, overview, genres, score } = this.state;
//     const percent = Math.round((score * 100) / 10);
//     const { url } = this.props.match;
//     return (
//       <div>
//         <button type="button">Go back</button>
//         <div>
//           <img className="pictures" src={poster} alt={title} />
//           <div>
//             <h1>{title}</h1>
//             <p>User Score: {`${percent}%`}</p>
//             <h2>Overview</h2>
//             <p>{overview}</p>
//             <h2>Genres</h2>
//             <p>{genres.join(", ")}</p>
//           </div>
//         </div>
//         <div>
//           <ul>
//             <li>
//               <NavLink to={`${url}/cast`}>Cast</NavLink>
//             </li>
//             <li>
//               <NavLink to={`${url}/reviews`}>Reviews</NavLink>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <Switch>
//             <Route path="/movies/:movieId/cast" component={CastDetails} />
//             <Route path="/movies/:movieId/reviews" component={ReviewsDetails} />
//           </Switch>
//         </div>
//       </div>
//     );
//   }
// }

// export default MovieDetailsPage;
