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
