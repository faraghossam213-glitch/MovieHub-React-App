import { useNavigate } from "react-router-dom"

const MovieCard = ({ movie }) => {

  const navigate = useNavigate()

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="movie-info">

        <h3>{movie.title}</h3>

        <p>
          {movie.release_date}
        </p>

        <span>
          ⭐ {movie.vote_average?.toFixed(1)}
        </span>

      </div>

    </div>
  )
}

export default MovieCard