import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useParams } from "react-router-dom";
import getMovieById from "../scripts/getMovieById";
function MovieInfo() {
    const [movie, setMovie] = useState({});
    const { movieId } = useParams();
    useEffect(() => {
        async function getMovie() {
            const getMovie = await getMovieById(movieId);
            setMovie(getMovie);
        }
        getMovie();
    }, []);
    return (
        <div className="movie_info">
            <img
                className="movie_info_image"
                src={`${movie.poster_path}`}
                alt={movie.title}
            />
            <h1 className="movie_info_title">{movie.title}</h1>
            <h1 className="movie_info_rating">
                <FaStar /> {movie.rating}{" "}
            </h1>

            <div className="movie_info_Overview_div">
                <h2 className="movie_info_Overview_header">Description</h2>
                <p className="movie_info_Overview">{movie.description}</p>
            </div>
        </div>
    );
}

export default MovieInfo;
