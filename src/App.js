import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
	const [movies, setMovies] = useState([]);
	const [IsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

	const fetchMovieHandler = async () => {
		try {
			setIsLoading(true);
      setError(null);

      const resp = await fetch("https://swapi.dev/api/films");
      if(!resp.ok) {
        throw new Error("Something went wrong ....Retrying")
      }
			const { results } = await resp.json();
			const transformedMovieData = results.map((movieData) => ({
				id: movieData.episode_id,
				title: movieData.title,
				openingText: movieData.opening_crawl,
				releaseDate: movieData.release_date,
			}));

      setMovies(transformedMovieData);
			setIsLoading(false);
		} catch (error) {
      setError(error.message)
			console.log(error.message);
		}
    setIsLoading(false);
	};

	useEffect(() => {
    fetchMovieHandler();
	}, []);

	return (
		<React.Fragment>
      <AddMovie />
			<section>
				<button>Fetch Movies</button>
			</section>
			<section>
				{IsLoading ? <p>Loading...</p> : <MoviesList movies={movies} />}
        {!IsLoading && !movies.length && !error && <p>No movies found</p>}
        {!IsLoading && error && <p>{error}</p>}
			</section>
		</React.Fragment>
	);
}

export default App;
