 import axios from "axios"
import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

const Movies = () => {

  const [movies, setMovies] = useState([])

  const apiKey = "a3fda6c505c97504d40e3d5e0f46bd55"

  useEffect(() => {

    axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    )
      .then(res => setMovies(res.data.results))
      .catch(err => console.log(err))

  }, [])

  return (
    <div className="container">

      <h1>Popular Movies</h1>

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

    </div>
  )
}

export default Movies