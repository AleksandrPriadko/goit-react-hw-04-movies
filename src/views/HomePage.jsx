import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";

export default function HomePage() {
  const match = useRouteMatch();
  const [trendingMovies, setTrendingMovies] = useState([]);
  console.log(match);
  console.log(trendingMovies);
  useEffect(() => {
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
    axios.get(URL).then(({ data }) => {
      setTrendingMovies(data.results);
    });
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {trendingMovies.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// class HomePage extends Component {
//   state = {
//     trendingMovies: [],
//   };

//   componentDidMount = () => {
//     const API_KEY = "4ecc398414630285446ccb200129c746";
//     const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
//     axios.get(URL).then(({ data }) => {
//       this.setState({
//         trendingMovies: data.results,
//       });
//     });
//   };

//   render() {
//     const { trendingMovies } = this.state;
//     const { location } = this.props;
//     return (
//       <>
//         <h1>Trending today</h1>
//         <ul>
//           {trendingMovies.map(({ id, title }) => (
//             <li key={id}>
//               <Link
//                 to={{
//                   pathname: `/movies/${id}`,
//                   state: { from: location },
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

// export default withRouter(HomePage);
