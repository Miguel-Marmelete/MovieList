import MovieCard from "../components/MovieCard";
import urls from "../../urls";
import React, { useEffect, useState } from "react";
import handleSearchOutsideHome from "../scripts/handleSearchOutsideHome";
function Watchlist() {
    const [watchlistMovies, setwatchlistMovies] = useState([]);
    const [change, setChange] = useState(false);
    const username = sessionStorage.getItem("username");
    handleSearchOutsideHome();

    useEffect(() => {
        const movies = async () => {
            fetch("http://localhost:8000/api/watchlist/" + username)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro na solicitação.");
                    }
                    return response.json();
                })
                .then((data) => {
                    // Lidar com os dados retornados pelo backend
                    console.log("Lista de filmes da watchlist:", data);
                    setwatchlistMovies(data);
                })
                .catch((error) => {
                    console.error("Erro:", error);
                });
        };
        movies();
    }, [change]);
    const movieCards = watchlistMovies.map((movie) => {
        return (
            <MovieCard
                key={movie.movie_id}
                movie={movie}
                setChange={setChange}
            />
        );
    });

    return <div className="watchlist_page">{movieCards}</div>;
}

export default Watchlist;
