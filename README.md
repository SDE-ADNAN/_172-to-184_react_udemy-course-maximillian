## Section 14: Sending Http Requests (e.g. Connecting to a Database)

---

## -- Video 172 : Module Intro

What we will learn in this module:

- connecting a backend And Database
- Sending HTTP Requests
- How do React Apps Interact with the Backend and database
- Sending HTTP Requests and using responses
- Handling Errors And loading states

---

## -- Video 173 : How to (NOT) connect to a database

- browser side apps dont directly talk to a database
- it is very bad practice to connect to a database from the browser directly
- the browser is not a secure environment to talk to a database as anyone can see the requests
- database credentials may be exposed as whole js code is visible to each user of a website
- you must have a backend to talk to the database using apis and http requests from the browser it could be any backend language like php, python, nodejs, java, etc

---

## -- Video 174 : Using the Star Wars API

MUST READ:

In the next lecture, you will be introduced to our demo backend that will be used in this course section: The Star Wars API.

I will use this page: https://swapi.dev/

Loading this page (and hence accessing this backend) might fail - if that is the case for you, you can use this alternative: https://swapi.py4e.com/

---

## -- Video 175 : Our Starting App and backend

just explained about swapi.dev

---

## -- Video 176 : Sending a GET Request

- we can use axios or fetch to send http requests here we will use fetch, axios just makes it easier and more readable and is a third party library and fetch is a native browser api and axios gives us all errors which are more readable and fetch gives us only network errors

- got to https://axios-http.com/docs/intro to know more on axios

- ## Code

```JSX
import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = React.useState([]);

  function fetchMoviesHandler() {
    // default fetch method is GET
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            // we are transforming the data as per our need
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      });
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
```

---

## -- Video 177 : Using Async/Await

- we can use async await instead of .then() to handle promises
- async await is a more readable and cleaner way to handle promises in fetch calls
- ## Code async await form of the above fetchMoviesHandler

```JSX

  async function fetchMoviesHandler() {
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
  }

```

---

## -- Video 178 : Handling Loading & data states

- we can use a loading state to show a loading spinner while the data is being fetched
- we can use a data state to show a message if there is no data

- ## Code

```JSX
import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = React.useState([]);
  // here we are handling loading state
  const [isLoading, setIsLoading] = React.useState(false);

  async function fetchMoviesHandler() {
    // setting loading state to true before fetching data
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
    // setting loading state to false after fetching data
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
```

---

## -- Video 179 : Handling HTTP Errors

- we can use a error state to show a message if there is an error
- we can use a try catch block to handle errors when used with async await
- but when using .then() we can use the catch method to handle errors
- ## Code

```JSX
import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    // default fetch method is GET

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      // we must check if the response is ok before we parse it or it will throw an error from that block
      // instead of our thrown error.
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

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
    } catch (error) {
      setError(error.message);
    }
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

  if (error && !isLoading) {
    content = <p>{error}</p>;
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

```

---

## -- Video 180 : Using useEffect() for requests

- we can use useEffect() to make the fetch call when the component is rendered with help of its empty dependency array

- we must use the useCallback hook to wrap the fetchMoviesHandler function to avoid infinite loops which may occur when fetchMoviesHandler gets recreated on every render cycle if any state inside the fetchMoviesHandler function changes and after that we can pass that fetchMoviesHandler function to the useEffect() hook as a dependency that whenever this function gets recreated the useEffect() hook will run again

- ## Code

```JSX
import React, { useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // default fetch method is GET

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      // we must check if the response is ok before we parse it or it will throw an error from that block
      // instead of our thrown error.
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  // if movies is not empty then we will show the movies
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  // if isLoading is true then we will show a loading... text
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error && !isLoading) {
    content = <p>{error}</p>;
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

```

---

## -- Video 181 : Preparing the Project for Next Steps

- we first of all unzipped the project provided as an resource in the course on video 181
- now we will create acc in firebase to make a real time database and make post requests to it
- create a project on ur firebase acc
- then go to the realtime database and create a database with test mode on or u will not be able to make requests to it
- Code

```JSX
import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // here we must add /movies.json to the end of the url because we are using firebase database and it requires it to make a json file in db
      const response = await fetch(
        "https://react-api-for-post-request-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
```

---
