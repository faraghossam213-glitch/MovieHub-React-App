 import { useContext } from "react"
import { Link } from "react-router-dom"

import { LanguageContext } from "../context/Languagecontext"

const Header = () => {

  const { language, setLanguage } = useContext(LanguageContext)

  return (
    <header className="header">

      <div className="logo">
        Movie App
      </div>

      <nav>

        <Link to="/">
          Home
        </Link>

        <Link to="/movies">
          Movies
        </Link>

        <Link to="/watchlist">
          ♥ Watchlist
        </Link>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>

      </nav>

    </header>
  )
}

export default Header