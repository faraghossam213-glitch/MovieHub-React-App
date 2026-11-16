 import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const MovieDetails = () => {

  const [movie, setMovie] = useState()
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  const movieParam = useParams()

  const apiKey = "a3fda6c505c97504d40e3d5e0f46bd55"

  useEffect(() => {

    axios.get(
      `https://api.themoviedb.org/3/movie/${movieParam.movieId}?api_key=${apiKey}`
    )
      .then(res => {
        console.log("Movie:", res.data)
        setMovie(res.data)

        const savedMovies =
          JSON.parse(localStorage.getItem("watchlist")) || []

        const movieExists = savedMovies.some(
          savedMovie => savedMovie.id === res.data.id
        )

        setIsInWatchlist(movieExists)
      })
      .catch(err => {
        console.log("API Error:", err)
      })

  }, [])


  const addToWatchlist = () => {

    const savedMovies =
      JSON.parse(localStorage.getItem("watchlist")) || []

    const movieExists = savedMovies.some(
      savedMovie => savedMovie.id === movie.id
    )

    if (!movieExists) {

      savedMovies.push(movie)

      localStorage.setItem(
        "watchlist",
        JSON.stringify(savedMovies)
      )

      setIsInWatchlist(true)
    }

  }


  const removeFromWatchlist = () => {

    const savedMovies =
      JSON.parse(localStorage.getItem("watchlist")) || []

    const newMovies = savedMovies.filter(
      savedMovie => savedMovie.id !== movie.id
    )

    localStorage.setItem(
      "watchlist",
      JSON.stringify(newMovies)
    )

    setIsInWatchlist(false)
  }


  return (
    <div className="details-container">

      <div className="poster">

        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
        />

      </div>

      <div className="details">

        <h1>{movie?.title}</h1>

        <p>
          {movie?.release_date}
        </p>

        <p>
          ⭐ {movie?.vote_average?.toFixed(1)}
        </p>

        <p className="overview">
          {movie?.overview}
        </p>

        <div className="genres">

          {
            movie?.genres?.map(genre => {

              return (
                <span key={genre.id}>
                  {genre.name}
                </span>
              )

            })
          }

        </div>

        <p>
          <b>Duration:</b> {movie?.runtime} Min.
        </p>

        <p>
          <b>Language:</b> {movie?.original_language}
        </p>

        <div className="companies">

          {
            movie?.production_companies?.map(company => {

              return (
                <div className="company" key={company.id}>

                  {
                    company.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                      />
                    )
                  }

                  <p>{company.name}</p>

                </div>
              )

            })
          }

        </div>

        {
          isInWatchlist ? (

            <button
              className="watch-btn"
              onClick={removeFromWatchlist}
            >
              ♥ Remove from Watchlist
            </button>

          ) : (

            <button
              className="watch-btn"
              onClick={addToWatchlist}
            >
              ♥ Add to Watchlist
            </button>

          )
        }

      </div>

    </div>
  )
}

export default MovieDetails