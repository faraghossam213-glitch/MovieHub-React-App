 import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

const Watchlist = () => {

  const [movies, setMovies] = useState([])

  useEffect(() => {

    const savedMovies =
      JSON.parse(localStorage.getItem("watchlist")) || []

    setMovies(savedMovies)

  }, [])

  return (
    <div className="container">

      <h1>My Watchlist</h1>

      {
        movies.length === 0 ? (

          <p>
            Your watchlist is empty.
          </p>

        ) : (

          <div className="movies-grid">

            {
              movies.map(movie => {

                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                  />
                )

              })
            }

          </div>

        )
      }

    </div>
  )
}

export default Watchlist