import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    // default fetch method is GET
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);
  }
  let content = <p>Found no movies.</p>;

  // if movies is not empty then we will show the movies
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  // if isLoading is true then we will show a loading... text
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
