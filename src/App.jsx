import { useEffect, useState } from "react";
import Search from "./components/search";
import Spinner from "./components/spinner";
import MovieCard from "./components/movieCard";
import { useDebounce } from "react-use";
import { Client } from "appwrite";
import { trending, updateSearchCount } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjVhYjg3ZDZhZjk5ZjVhZmVkOTBjYmNhMTM2YjVlZSIsIm5iZiI6MTc0MTE3MDQxMC4wNjIsInN1YiI6IjY3YzgyNmVhODIxYzE5YjVlYmU2ZjJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZfluoHs8jvX5N-1V7afOjn4nOOTUKS476d3WEFWLyzs`,
  },
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearchResult] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [debouncedSearch, setDebouncedSearch] = useState("");
  useDebounce(() => setDebouncedSearch(search), 500, [search]);

  const client = new Client();
  client.setProject("67c9aaae000634669e97");

  const fetchMovie = async (query = "") => {
    setLoading(true);
    setErrorMessage("");
    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endPoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch Movies");
      }
      const dataFetched = await response.json();
      console.log(dataFetched);
      if (dataFetched.Response === "False") {
        setErrorMessage(dataFetched.Error || "Failed to fetch Movies");
        setMovieList([]);
        return;
      }
      setMovieList(dataFetched.results || []);
      if (query && dataFetched.results.length > 0) {
        await updateSearchCount(query, dataFetched.results[0]);
      }
    } catch (e) {
      setErrorMessage("Error fetching movies : ", e);
    } finally {
      setLoading(false);
    }
  };
  const loadTrendingMovies = async () => {
    const trendResults = await trending();
    setTrendingMovies(trendResults);
    console.log(trendingMovies);
  };
  useEffect(() => {
    fetchMovie(debouncedSearch);
  }, [debouncedSearch]);
  useEffect(() => {
    loadTrendingMovies();
  }, []);
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" className="kit-img" />
          <h1>
            Your Favorite <span className="text-gradient">Movies </span>
            without any hassle with{" "}
            <span className="text-gradient">frosty</span>
          </h1>
          <Search search={search} setSearchResult={setSearchResult} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((trendMovies, index) => (
                <li key={trendMovies.$id}>
                  <p>{index + 1}</p>
                  <img src={trendMovies.poster_url} alt={trendMovies.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <h2 className="mt-[40px] ">Popular</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-white">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>

      <footer className="  bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-indigo-400">
          © 2023{"  "}
          <a
            href="https://github.com/tanishs26"
            target="_blank"
            className="hover:underline"
          >
            tanishs26
          </a>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-indigo-500 dark:text-indigo-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>

          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </main>
  );
};

export default App;
