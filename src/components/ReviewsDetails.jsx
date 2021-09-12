import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ReviewsDetails() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const API_KEY = "4ecc398414630285446ccb200129c746";
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
    axios
      .get(URL)
      .then(({ data }) => {
        const { results } = data;
        setReviews(results);
        setContent(
          results.map(({ content }) => {
            return content;
          })
        );
      })
      .catch((error) => error.messages);
  }, [movieId]);

  return (
    <>
      {content.length ? (
        <ul>
          {reviews.map(({ id, content }) => (
            <li key={id}> {content}</li>
          ))}
        </ul>
      ) : (
        <h3>We don`t any reviews for this movie</h3>
      )}
    </>
  );
}

// class ReviewsDetails extends Component {
//   state = {
//     reviews: [],
//     content: [],
//   };

//   componentDidMount = () => {
//     const { movieId } = this.props.match.params;
//     const API_KEY = "4ecc398414630285446ccb200129c746";
//     const URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
//     axios
//       .get(URL)
//       .then(({ data }) => {
//         const { results } = data;
//         this.setState({
//           reviews: results,
//           content: results.map(({ content }) => {
//             return content;
//           }),
//         });
//       })
//       .catch((error) => error.messages);
//   };

//   render() {
//     const { reviews, content } = this.state;

//     return (
//       <>
//         {content.length ? (
//           <ul>
//             {reviews.map(({ id, content }) => (
//               <li key={id}> {content}</li>
//             ))}
//           </ul>
//         ) : (
//           <h3>We don`t any reviews for this movie</h3>
//         )}
//       </>
//     );
//   }
// }

// export default ReviewsDetails;
