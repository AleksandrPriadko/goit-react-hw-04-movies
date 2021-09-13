import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./castDetails.css";

export default function CastDetails() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const API_KEY = "4ecc398414630285446ccb200129c746";
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        const { cast } = data;
        setCast(cast);
      });
  }, [movieId]);

  return (
    <>
      <ul>
        {cast.map(({ id, name, profile_path }) => (
          <li className="itemCast" key={id}>
            <div>
              <img
                className="imgCast"
                src={`https://image.tmdb.org/t/p/original${profile_path}`}
                alt={name}
              />
              <p>{name}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

// class CastDetails extends Component {
//   state = {
//     cast: [],
//   };

//   componentDidMount = () => {
//     const { movieId } = this.props.match.params;
//     const API_KEY = "4ecc398414630285446ccb200129c746";
//     axios
//       .get(
//         `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
//       )
//       .then(({ data }) => {
//         console.log(data);
//         const { cast } = data;
//         this.setState({
//           cast: cast,
//         });
//       });
//   };

//   render() {
//     const { cast } = this.state;
//     console.log(cast);
//     return (
//       <>
//         <ul>
//           {cast.map(({ id, name, profile_path }) => (
//             <li key={id}>
//               <div>
//                 <img
//                   src={`https://image.tmdb.org/t/p/original${profile_path}`}
//                   alt={name}
//                 />
//                 <p>{name}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </>
//     );
//   }
// }

// export default CastDetails;
