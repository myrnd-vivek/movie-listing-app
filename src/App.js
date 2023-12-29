import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
	const [movies, setMovies] = useState([]);
	const [IsLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const URL =
		"https://react-http-35dd4-default-rtdb.firebaseio.com/movie.json";
	const fetchMovieHandler = async () => {
		try {
			setIsLoading(true);
			setError(null);

			const resp = await fetch(URL);
			if (!resp.ok) {
				throw new Error("Something went wrong ....Retrying");
			}
			const data = await resp.json();
			console.log(data);

			const loadedMovie = [];
			for (const key in data) {
				loadedMovie.push({
					id: key,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				});
			}
			setMovies(loadedMovie);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			console.log(error.message);
		}
		setIsLoading(false);
	};

	const addMovie = async ({ movie }) => {
		try {
			const resp = await fetch(URL, {
				method: "POST",
				body: JSON.stringify(movie),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await resp.json();
			fetchMovieHandler();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteMovie = async ({ id }) => {
		try {
			const resp = await fetch(
				`https://react-http-35dd4-default-rtdb.firebaseio.com/movie/${id}.json`,
				{
					method: "DELETE",
				}
			);
			const data = await resp.json();
			console.log(data);
      fetchMovieHandler();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMovieHandler();
	}, []);

	return (
		<React.Fragment>
			<AddMovie addMovie={addMovie} />
			<section>
				<button>Fetch Movies</button>
			</section>
			<section>
				{IsLoading ? <p>Loading...</p> : <MoviesList movies={movies} deleteMovie={deleteMovie}/>}
				{!IsLoading && !movies.length && !error && (
					<p>No movies found</p>
				)}
				{!IsLoading && error && <p>{error}</p>}
			</section>
		</React.Fragment>
	);
}

export default App;
