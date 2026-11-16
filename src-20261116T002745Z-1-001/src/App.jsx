 import { Route, Routes } from "react-router-dom"
import { useContext } from "react"

import Home from "./pages/Home"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"
import Watchlist from "./pages/Watchlist"
import NotFound from "./pages/NotFound"

import Header from "./components/Header"
import SupportChat from "./components/SupportChat"

import { LanguageContext } from "./context/Languagecontext"

function App() {
  const { language } = useContext(LanguageContext)
  const direction = language === "ar" ? "rtl" : "ltr"

  return (
    <div dir={direction}>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* الزر العائم للشات المساعد */}
      <SupportChat />
    </div>
  )
}

export default App;

 