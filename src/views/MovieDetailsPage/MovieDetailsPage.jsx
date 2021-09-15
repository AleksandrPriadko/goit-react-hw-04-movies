import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { getMoviesDetailsApi } from "../../Api/moviesApi";
import "./movieDetails.css";

const CastDetails = lazy(() =>
  import(
    "../../components/CastDetails/CastDetails" /* webpackChunkName: "CastDetails-views" */
  )
);
const ReviewsDetails = lazy(() =>
  import(
    "../../components/ReviewsDetails" /* webpackChunkName: "ReviewsDetails-views" */
  )
);

export default function MovieDetailsPage() {
  const location = useLocation();
  const { state } = location;
  const { push } = useHistory();
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  const [poster, setPoster] = useState(null);
  const [title, setTitle] = useState(null);
  const [score, setScore] = useState(null);
  const [overview, setOverview] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getMoviesDetailsApi(movieId)
      .then(({ data }) => {
        setPoster(`https://image.tmdb.org/t/p/original${data.poster_path}`);
        setTitle(data.title);
        setOverview(data.overview);
        setGenres(data.genres.map((genre) => genre.name));
        setScore(data.vote_average);
      })
      .catch((error) => `Error, ${error.message}`);
  }, []);

  const handleGoBack = () => {
    push({
      pathname: state?.from?.pathname ?? "/",
      state: state?.querys,
    });
  };

  const percent = Math.round((score * 100) / 10);

  return (
    <div>
      <button type="button" onClick={handleGoBack}>
        {state?.label ?? "Go back"}
      </button>
      <div className="container_details">
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
            <NavLink
              to={{
                pathname: `${url}/cast`,
                state,
              }}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: `${url}/reviews`,
                state,
              }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/movies/:movieId/cast">
            <CastDetails />
          </Route>
          <Route path="/movies/:movieId/reviews">
            <ReviewsDetails />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
