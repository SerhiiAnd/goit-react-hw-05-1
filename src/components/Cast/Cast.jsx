// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchCast } from "../../MoviesApi";
// import Error from "../Error/Error";
// import css from "./Cast.module.css";

// const Cast = () => {
//   const [cast, setCast] = useState([]);
//   const { movieId } = useParams();
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     async function fetchedData() {
//       try {
//         const data = await fetchCast(movieId);
//         setCast(data.cast);
//       } catch (error) {
//         setError(true);
//       }
//     }

//     fetchedData();
//   }, [movieId]);

//   return (
//     <>
//       {error && <Error />}
//       {!cast.length && <div>This information has not been added yet</div>}
//       {cast.length && (
//         <ul className={css.list}>
//           {cast?.map(({ id, name, character, profile_path }) => (
//             <li key={id}>
//               <div className={css.imageContainer}>
//                 {profile_path ? (
//                   <img
//                     src={`https://image.tmdb.org/t/p/w500${profile_path}`}
//                     alt={name}
//                     width={150}
//                   />
//                 ) : (
//                   <div
//                     width={300}
//                     style={{
//                       backgroundColor: "lightgray",
//                       height: 225,
//                       width: 150,
//                     }}
//                   ></div>
//                 )}
//               </div>
//               <div className={css.actorDesc}>
//                 <span className={css.name}>{name}</span>
//                 <span className={css.character}>{character}</span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// };

// export default Cast;
import { useEffect, useState } from "react";
import { fetchCast } from "../../MoviesApi";
import { useParams } from "react-router-dom";
import css from "./Cast.module.css";

export default function Cast() {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function getCast() {
      try {
        setLoading(true);
        const data = await fetchCast(movieId);
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  return (
    <div>
      {loading && <h3 className={css.load}>Loading...</h3>}
      <ul className={css.list}>
        {cast.map((person) => (
          <li className={css.item} key={person.cast_id}>
            {person.profile_path === null ? (
              <div className={css.noPhoto}>
                <p className={css.noPhotoText}>No photo available</p>
              </div>
            ) : (
              <img
                className={css.img}
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
              ></img>
            )}
            <h2 className={css.name}>{person.original_name}</h2>
            <p className={css.text}>{person.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
