 import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const Home = () => {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const location = useLocation()
  const apiKey = "a3fda6c505c97504d40e3d5e0f46bd55"

  // دالة جلب الأفلام
  const fetchMovies = (searchQuery = "") => {
    setLoading(true)
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`

    if (searchQuery.trim() !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`
      setHasSearched(true)
    } else {
      setHasSearched(false)
    }

    axios
      .get(url)
      .then(res => {
        setMovies(res.data.results || [])
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  // عند فتح الصفحة أو عند الضغط على رابط Home من الـ Header
  useEffect(() => {
    setQuery("")
    fetchMovies("")
  }, [location.pathname])

  // عند الضغط على زر البحث أو Enter
  const handleSearch = (e) => {
    e.preventDefault()
    fetchMovies(query)
  }

  return (
    <div className="container">
      <section className="hero">
        <h1>Welcome to our movie app</h1>
        <p>
          Millions of movies, TV shows and people to discover. Explore now.
        </p>

        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            placeholder="Search and explore..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <h2>{hasSearched ? `Search Results for: "${query}"` : "Popular Movies"}</h2>

      {loading ? (
        <p style={{ textAlign: "center", margin: "40px 0" }}>Loading movies...</p>
      ) : movies.length > 0 ? (
        <div className="movies-grid">
          {movies.slice(0, 12).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h1 style={{ fontSize: "60px", margin: "0" }}>🔍</h1>
          <h3>No Movies Found</h3>
          <p style={{ color: "#888" }}>
            We couldn't find any movie matching "{query}". Try searching with another name.
          </p>
          <button
            onClick={() => {
              setQuery("")
              fetchMovies("")
            }}
            style={{
              padding: "10px 20px",
              marginTop: "15px",
              backgroundColor: "#f5c518",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Show Popular Movies
          </button>
        </div>
      )}
    </div>
  )
}

export default Home