import React, { useState } from "react";

const AddMovie = () => {
	const [movie, setMovie] = useState({
		title: "",
		openingText: "",
		releaseDate: "",
	});

	const changeHandler = (event) => {
		const { name, value } = event.target;
		setMovie({ ...movie, [name]: value });
	};

	const reset = () => {
		setMovie({
			title: "",
			openingText: "",
			releaseDate: "",
		});
	};

	const onAddMovie = () => {
		console.log(movie);
    reset();
	};

	return (
		<section>
			<div style={{ textAlign: "left" }}>
				<div>
					<h4>Title</h4>
					<input
						type="text"
						name="title"
						value={movie.title}
						onChange={changeHandler}
            style={{width: "100%", borderRadius: "8px"}}
					/>
				</div>
				<div>
					<h4>Opening Text</h4>
					<textarea
						cols="30"
						rows="10"
						name="openingText"
						value={movie.openingText}
						onChange={changeHandler}
            style={{width: "100%", borderRadius: "8px"}}
					></textarea>
				</div>
				<div>
					<h4>Release Date</h4>
					<input
						type="text"
						name="releaseDate"
						value={movie.releaseDate}
						onChange={changeHandler}
            style={{width: "100%", marginBottom: "8px", borderRadius: "8px"}}
					/>
				</div>
			</div>
			<button onClick={onAddMovie}>Add Movies</button>
		</section>
	);
};

export default AddMovie;
